const MIN_SCORE_FORMATTER_TARGET = 1e3;

function formatScore({ score }: { score: number }) {
  return score < MIN_SCORE_FORMATTER_TARGET
    ? `< ${MIN_SCORE_FORMATTER_TARGET.toLocaleString()}`
    : score.toLocaleString();
}

export { formatScore };
