'use client';

// This is a slightly modified version for the list component Warpcast web uses.

import React from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/cn';

type LoadingIndicatorProps = {
  containerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = React.memo(
  ({ containerClassName }) => (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent opacity-50 text-default',
        'h-6 w-6 border-[3px]',
        containerClassName,
      )}
      role="status"
      aria-label="loading"
    />
  ),
);

type ListProps<T, TExtra> = {
  containerClassName?: string;
  data: T[] | undefined;
  emptyView: React.ReactElement;
  isFetchingNextPage?: boolean;
  keyExtractor: (item: T, index: number) => string;
  onEndReached?: (() => void) | (() => Promise<void>);
  onEndReachedThreshold?: number;
  renderItem: (params: {
    index: number;
    item: T;
    extra?: TExtra;
  }) => React.ReactElement;
  itemClassName?: string;
  onManualScroll?: () => void;
  extraProps?: TExtra;
};

const List = function <T, TExtra = undefined>({
  data,
  emptyView,
  isFetchingNextPage,
  keyExtractor,
  extraProps,
  onEndReached,
  onEndReachedThreshold = 0.35,
  itemClassName,
  renderItem,
}: ListProps<T, TExtra>) {
  const dataSizeForLastOnEndReachedRef = React.useRef<number>();
  const reverseLoadingRef = React.useRef<HTMLDivElement>(null);

  const displayData = React.useMemo(() => {
    return data || [];
  }, [data]);

  const inViewThresholdIndex = React.useMemo(() => {
    if (!displayData) {
      return Number.POSITIVE_INFINITY;
    }

    const ti = Math.floor(
      (displayData.length - 1) * (1 - onEndReachedThreshold),
    );

    return ti;
  }, [displayData, onEndReachedThreshold]);

  const onItemInView = React.useCallback(
    async (index: number) => {
      if (
        !isFetchingNextPage &&
        onEndReached &&
        dataSizeForLastOnEndReachedRef.current !== displayData.length &&
        index >= inViewThresholdIndex
      ) {
        dataSizeForLastOnEndReachedRef.current = displayData.length;
        onEndReached();
        reverseLoadingRef.current?.scrollIntoView({ block: 'end' });
      }
    },
    [
      displayData.length,
      inViewThresholdIndex,
      isFetchingNextPage,
      onEndReached,
    ],
  );

  if (displayData.length === 0 && !isFetchingNextPage) {
    return emptyView;
  }

  return (
    <React.Fragment>
      {displayData.map((item, index) => {
        return (
          <React.Fragment key={keyExtractor(item, index)}>
            <MemoizedListItem
              key={keyExtractor(item, index)}
              extraProps={extraProps}
              index={index}
              item={item}
              itemClassName={itemClassName}
              renderItem={renderItem}
              onItemInView={onItemInView}
            />
          </React.Fragment>
        );
      })}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center px-4 py-6">
          <LoadingIndicator />
        </div>
      )}
    </React.Fragment>
  );
};

const MemoizedList = React.memo(List) as typeof List;

type ListItemProps<T, TExtra = undefined> = Pick<
  ListProps<T, TExtra>,
  'renderItem'
> & {
  index: number;
  item: T;
  onItemInView: (index: number) => void;
  itemClassName?: string;
  extraProps?: TExtra;
};

const ListItem = function <T, TExtra = undefined>({
  index,
  extraProps,
  item,
  renderItem,
  onItemInView,
  itemClassName,
}: ListItemProps<T, TExtra>) {
  const { ref: inViewRef, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      onItemInView(index);
    }
  }, [inView, index, onItemInView]);

  return (
    <div className={itemClassName} ref={inViewRef}>
      {renderItem({ index, item, extra: extraProps })}
    </div>
  );
};

ListItem.displayName = 'ListItem';

const MemoizedListItem = React.memo(ListItem) as typeof ListItem;

export { MemoizedList as List };
