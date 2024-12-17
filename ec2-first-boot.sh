# Runs via cloud-init as root user on first boot.

set -ex -o pipefail

# Persist across reboots
echo >> /etc/sysctl.conf << EOF
# Increase max number of allowed inbound connections
net.core.somaxconn = 1048576
EOF
sysctl -p /etc/sysctl.conf # Apply above settings
