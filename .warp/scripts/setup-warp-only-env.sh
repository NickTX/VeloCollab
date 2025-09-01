#!/bin/bash

# VeloCollab Warp-Only Environment Setup
# Configures pager settings ONLY when running in Warp terminal

# Colors
VELO_ORANGE='\033[38;5;208m'
VELO_GREEN='\033[38;5;29m'
WHITE='\033[1;37m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${VELO_ORANGE}⚡ Setting up Warp-ONLY environment for VeloCollab${NC}"
echo -e "${WHITE}=====================================================${NC}"
echo ""

# Check if we should update shell profile
SHELL_PROFILE=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
fi

if [ -n "$SHELL_PROFILE" ]; then
    echo -e "${CYAN}🔧 Shell profile configuration...${NC}"
    echo -e "   Detected shell profile: ${WHITE}$SHELL_PROFILE${NC}"

    # Check if Warp-specific config already exists
    if ! grep -q "# VeloCollab Warp-Only Configuration" "$SHELL_PROFILE" 2>/dev/null; then
        echo ""
        read -p "$(echo -e ${CYAN}Add Warp-ONLY environment config to $SHELL_PROFILE? [y/N]: ${NC})" -n 1 -r
        echo

        if [[ $REPLY =~ ^[Yy]$ ]]; then
            cat >> "$SHELL_PROFILE" << 'EOF'

# VeloCollab Warp-Only Configuration
# These settings ONLY apply when using Warp terminal
# Other terminals will use normal pager settings

# Function to detect if we're in Warp
is_warp() {
    [[ "$TERM_PROGRAM" == "WarpTerminal" ]] || [[ -n "$WARP_IS_LOCAL_SHELL_SESSION" ]]
}

# Apply Warp-specific settings only in Warp
if is_warp; then
    # Disable pagers for Warp compatibility
    export GH_PAGER=""           # GitHub CLI
    export PAGER="cat"           # Default pager
    export BAT_PAGER=""          # Bat syntax highlighter
    export SYSTEMD_PAGER=""      # Systemd commands
    export MANPAGER="cat"        # Man pages
    export LESS=""               # Less pager options
    export DELTA_PAGER=""        # Delta git diff tool
    export DOCKER_CLI_HINTS=false # Docker CLI hints
    export HOMEBREW_NO_PAGER=1   # Homebrew pager

    # Git pager configuration for Warp only
    git config --global core.pager "cat" 2>/dev/null

    # Warp-specific aliases
    alias git-log='git --no-pager log'
    alias git-diff='git --no-pager diff'
    alias git-show='git --no-pager show'

    # VeloCollab shortcuts (only in Warp)
    alias velo-info='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/project-info.sh'
    alias velo-setup='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/setup-dev.sh'
    alias velo-start='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/start-full-stack.sh'
    alias velo-test='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/test-all.sh'
    alias velo-clean='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/clean-all.sh'

    # Optional: Show Warp optimization message
    if [[ "$PWD" == *"VeloCollab"* ]]; then
        echo "⚡ Warp optimizations active for VeloCollab"
    fi
else
    # In other terminals, ensure normal pager settings
    unset GH_PAGER BAT_PAGER SYSTEMD_PAGER
    export PAGER="${PAGER:-less}"
    export MANPAGER="${MANPAGER:-less}"

    # Restore normal git pager settings if not in Warp
    git config --global core.pager "less -FRX" 2>/dev/null
fi
EOF

            echo -e "   ${GREEN}✅ Warp-only configuration added to $SHELL_PROFILE${NC}"
            echo -e "   ${CYAN}ℹ️  Restart your terminal or run 'source $SHELL_PROFILE' to apply${NC}"
        else
            echo -e "   ${CYAN}ℹ️  Skipped shell profile update${NC}"
        fi
    else
        echo -e "   ${GREEN}✅ Warp-only configuration already present in $SHELL_PROFILE${NC}"
    fi
else
    echo -e "   ${CYAN}ℹ️  Could not detect shell profile${NC}"
fi

echo ""
echo -e "${CYAN}🧪 Current terminal detection...${NC}"

# Check if we're in Warp
if [[ "$TERM_PROGRAM" == "WarpTerminal" ]] || [[ -n "$WARP_IS_LOCAL_SHELL_SESSION" ]]; then
    echo -e "   ${GREEN}✅ Currently running in Warp terminal${NC}"
    echo -e "   ${CYAN}   Pager optimizations will be applied${NC}"

    # Apply settings for current session
    export GH_PAGER=""
    export PAGER="cat"
    export BAT_PAGER=""
    export SYSTEMD_PAGER=""
    export MANPAGER="cat"
    export DOCKER_CLI_HINTS=false
    export HOMEBREW_NO_PAGER=1

    echo -e "   ${GREEN}✅ Applied Warp optimizations for current session${NC}"
else
    echo -e "   ${CYAN}ℹ️  Not currently in Warp terminal${NC}"
    echo -e "   ${CYAN}   Normal pager settings will be preserved${NC}"
fi

echo ""
echo -e "${VELO_GREEN}🎉 Warp-Only Environment Setup Complete!${NC}"
echo -e "${WHITE}=======================================${NC}"
echo ""
echo -e "${CYAN}How this works:${NC}"
echo -e "• ${WHITE}In Warp${NC}: Pagers disabled, commands output directly"
echo -e "• ${WHITE}In other terminals${NC}: Normal pager behavior (less, more, etc.)"
echo -e "• ${WHITE}Automatic detection${NC}: No manual switching needed"
echo ""
echo -e "${CYAN}Test in different terminals:${NC}"
echo -e "• ${WHITE}Warp${NC}: gh workflow list ${CYAN}(direct output)${NC}"
echo -e "• ${WHITE}Terminal.app${NC}: gh workflow list ${CYAN}(uses pager)${NC}"
echo -e "• ${WHITE}iTerm2${NC}: gh workflow list ${CYAN}(uses pager)${NC}"
echo ""
echo -e "${VELO_GREEN}Best of both worlds! 🚀${NC}"
