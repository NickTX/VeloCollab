#!/bin/bash

# VeloCollab Warp Environment Setup
# Configures optimal environment variables for Warp terminal compatibility

# Colors
VELO_ORANGE='\033[38;5;208m'
VELO_GREEN='\033[38;5;29m'
WHITE='\033[1;37m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${VELO_ORANGE}⚡ Setting up Warp-optimized environment for VeloCollab${NC}"
echo -e "${WHITE}==========================================================${NC}"
echo ""

# Set environment variables for current session
echo -e "${CYAN}🔧 Configuring pagers for Warp compatibility...${NC}"

# Disable pagers that cause issues in Warp
export GH_PAGER=""           # GitHub CLI
export PAGER="cat"           # Default pager
export BAT_PAGER=""          # Bat (syntax highlighting cat)
export SYSTEMD_PAGER=""      # Systemd commands
export MANPAGER="cat"        # Man pages
export LESS=""               # Less pager options
export DELTA_PAGER=""        # Delta git diff tool

# Git configuration for better Warp compatibility
git config --global core.pager "cat"
git config --global pager.branch false
git config --global pager.diff false
git config --global pager.log false
git config --global pager.show false

echo -e "   ${GREEN}✅ Pagers disabled for optimal Warp output${NC}"

# Docker configuration
export DOCKER_CLI_HINTS=false  # Disable Docker CLI hints

echo -e "   ${GREEN}✅ Docker CLI hints disabled${NC}"

# Homebrew configuration
export HOMEBREW_NO_PAGER=1     # Disable Homebrew pager

echo -e "   ${GREEN}✅ Homebrew pager disabled${NC}"

# Check if we should update shell profile
echo ""
echo -e "${CYAN}🔧 Shell profile configuration...${NC}"

SHELL_PROFILE=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_PROFILE="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_PROFILE="$HOME/.bashrc"
fi

if [ -n "$SHELL_PROFILE" ]; then
    echo -e "   Detected shell profile: ${WHITE}$SHELL_PROFILE${NC}"

    # Check if VeloCollab Warp config already exists
    if ! grep -q "# VeloCollab Warp Configuration" "$SHELL_PROFILE" 2>/dev/null; then
        echo ""
        read -p "$(echo -e ${CYAN}Add Warp environment config to $SHELL_PROFILE? [y/N]: ${NC})" -n 1 -r
        echo

        if [[ $REPLY =~ ^[Yy]$ ]]; then
            cat >> "$SHELL_PROFILE" << 'EOF'

# VeloCollab Warp Configuration
# Optimized environment variables for Warp terminal compatibility
export GH_PAGER=""           # GitHub CLI
export PAGER="cat"           # Default pager
export BAT_PAGER=""          # Bat syntax highlighter
export SYSTEMD_PAGER=""      # Systemd commands
export MANPAGER="cat"        # Man pages
export LESS=""               # Less pager options
export DELTA_PAGER=""        # Delta git diff tool
export DOCKER_CLI_HINTS=false # Docker CLI hints
export HOMEBREW_NO_PAGER=1   # Homebrew pager

# Git pager configuration for Warp
alias git-log='git --no-pager log'
alias git-diff='git --no-pager diff'
alias git-show='git --no-pager show'

# VeloCollab shortcuts
alias velo-info='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/project-info.sh'
alias velo-setup='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/setup-dev.sh'
alias velo-start='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/start-full-stack.sh'
alias velo-test='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/test-all.sh'
alias velo-clean='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/clean-all.sh'
EOF

            echo -e "   ${GREEN}✅ Warp configuration added to $SHELL_PROFILE${NC}"
            echo -e "   ${CYAN}ℹ️  Restart your terminal or run 'source $SHELL_PROFILE' to apply${NC}"
        else
            echo -e "   ${CYAN}ℹ️  Skipped shell profile update${NC}"
        fi
    else
        echo -e "   ${GREEN}✅ Warp configuration already present in $SHELL_PROFILE${NC}"
    fi
else
    echo -e "   ${CYAN}ℹ️  Could not detect shell profile${NC}"
fi

echo ""
echo -e "${CYAN}🧪 Testing GitHub CLI with Warp...${NC}"

if command -v gh >/dev/null 2>&1; then
    echo -e "   Testing: ${WHITE}GH_PAGER='' gh auth status${NC}"
    GH_PAGER='' gh auth status 2>/dev/null || echo -e "   ${CYAN}ℹ️  GitHub CLI not authenticated (this is normal)${NC}"
    echo -e "   ${GREEN}✅ GitHub CLI pager test complete${NC}"
else
    echo -e "   ${CYAN}ℹ️  GitHub CLI not installed${NC}"
fi

echo ""
echo -e "${VELO_GREEN}🎉 Warp Environment Setup Complete!${NC}"
echo -e "${WHITE}===================================${NC}"
echo ""
echo -e "${CYAN}Now you can use these commands without pager issues:${NC}"
echo -e "• ${WHITE}gh workflow list${NC}"
echo -e "• ${WHITE}gh run list${NC}"
echo -e "• ${WHITE}gh pr list${NC}"
echo -e "• ${WHITE}git log${NC}"
echo -e "• ${WHITE}docker ps${NC}"
echo -e "• ${WHITE}man <command>${NC}"
echo ""
echo -e "${CYAN}Or use the new Warp workflows:${NC}"
echo -e "• ${WHITE}warp workflow gh-workflow-list${NC}"
echo -e "• ${WHITE}warp workflow gh-workflow-runs${NC}"
echo -e "• ${WHITE}warp workflow gh-pr-list${NC}"
echo ""
echo -e "${VELO_GREEN}Happy coding with Warp! 🚀${NC}"
