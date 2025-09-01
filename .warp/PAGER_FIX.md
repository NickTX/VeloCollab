# 🔧 Fixing Pager Issues in Warp Terminal

This guide explains how to fix commands like `gh workflow list` that open in vim/less and don't display output properly in Warp.

## 🎯 The Problem

Many CLI tools use pagers (like `less`, `more`, or `vim`) to display output, which doesn't work well with Warp's output capture system. Commands that commonly cause issues:

- `gh workflow list`
- `gh run list`
- `gh pr list`
- `git log`
- `docker ps` (sometimes)
- `man <command>`
- `brew search`

## ⚡ Quick Fixes

### 1. Immediate Solution (Per Command)
```bash
# Use environment variable to disable pager
GH_PAGER='' gh workflow list
GH_PAGER='' gh run list
GH_PAGER='' gh pr list

# Or use command-line flags when available
gh workflow list --no-pager  # Not all commands support this
git --no-pager log
```

### 2. Session-Wide Solution
Set these environment variables in your current terminal:
```bash
export GH_PAGER=""           # GitHub CLI
export PAGER="cat"           # Default pager
export BAT_PAGER=""          # Bat syntax highlighter
export MANPAGER="cat"        # Man pages
export DOCKER_CLI_HINTS=false # Docker CLI hints
export HOMEBREW_NO_PAGER=1   # Homebrew
```

### 3. Permanent Solution (Recommended)

Run the VeloCollab Warp environment setup:
```bash
# Automated setup
.warp/scripts/setup-warp-env.sh

# Or use the workflow
warp workflow setup-warp-environment
```

This will:
- ✅ Configure all necessary environment variables
- ✅ Add configuration to your shell profile (`.zshrc` or `.bashrc`)
- ✅ Create helpful aliases for VeloCollab development
- ✅ Test GitHub CLI compatibility

## 🔄 VeloCollab Warp Workflows

Instead of remembering environment variables, use our pre-configured workflows:

```bash
# GitHub workflows
warp workflow gh-workflow-list    # List workflows
warp workflow gh-workflow-runs    # Recent runs
warp workflow gh-pr-list         # Pull requests

# Git operations
warp workflow git-status-all     # Status across all components
```

## 🛠️ Manual Shell Profile Setup

If you prefer to configure manually, add this to your `~/.zshrc` or `~/.bashrc`:

```bash
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
git config --global core.pager "cat"
git config --global pager.branch false
git config --global pager.diff false
git config --global pager.log false
git config --global pager.show false

# Helpful aliases
alias git-log='git --no-pager log'
alias git-diff='git --no-pager diff'
alias git-show='git --no-pager show'

# VeloCollab shortcuts
alias velo-info='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/project-info.sh'
alias velo-start='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/start-full-stack.sh'
alias velo-test='cd ~/workspace/NickTX/VeloCollab && .warp/scripts/test-all.sh'
```

## 🧪 Testing Your Setup

After configuration, test these commands:

```bash
# GitHub CLI
gh workflow list
gh run list --limit 5
gh pr list

# Git
git log --oneline -5
git status

# Docker (if installed)
docker ps

# Homebrew (if installed)
brew list
```

All should display output directly in Warp without opening external pagers.

## 🔍 Troubleshooting

### Problem: Commands still open in vim/less
**Solution**: Make sure you've restarted your terminal or run `source ~/.zshrc`

### Problem: Some commands don't respect environment variables
**Solution**: Use command-specific flags:
```bash
git --no-pager log
man -P cat <command>
```

### Problem: Git still uses pager
**Solution**: Update git configuration:
```bash
git config --global core.pager "cat"
git config --global pager.branch false
git config --global pager.diff false
git config --global pager.log false
```

### Problem: Environment variables not persisting
**Solution**: Ensure they're added to the correct shell profile:
- Zsh: `~/.zshrc`
- Bash: `~/.bashrc` or `~/.bash_profile`

## 📋 Command Reference

### GitHub CLI (gh)
| Command | Warp-Optimized Version |
|---------|------------------------|
| `gh workflow list` | `GH_PAGER='' gh workflow list` |
| `gh run list` | `GH_PAGER='' gh run list --limit 10` |
| `gh pr list` | `GH_PAGER='' gh pr list` |
| `gh issue list` | `GH_PAGER='' gh issue list` |

### Git
| Command | Warp-Optimized Version |
|---------|------------------------|
| `git log` | `git --no-pager log --oneline -10` |
| `git diff` | `git --no-pager diff` |
| `git show` | `git --no-pager show` |
| `git branch` | `git --no-pager branch` |

### Docker
| Command | Warp-Optimized Version |
|---------|------------------------|
| `docker ps` | `DOCKER_CLI_HINTS=false docker ps` |
| `docker images` | `docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"` |

## 🎯 Why This Happens

Warp's output capture system works differently from traditional terminals:

1. **Traditional terminals**: Pagers can take full control of the display
2. **Warp**: Expects commands to output directly to stdout for proper capture and display
3. **The conflict**: Pagers try to open in "alternate screen mode" which Warp doesn't handle the same way

By disabling pagers, commands output directly to Warp's display system, providing:
- ✅ Proper output capture
- ✅ Copy/paste functionality
- ✅ Search within output
- ✅ Workflow integration
- ✅ Better performance

## 🚀 Next Steps

1. **Run the setup script**: `.warp/scripts/setup-warp-env.sh`
2. **Test GitHub CLI**: `gh workflow list`
3. **Use Warp workflows**: `warp workflow gh-workflow-list`
4. **Enjoy seamless development**: All commands now work perfectly in Warp!

---

**Now your GitHub CLI and other commands will work perfectly with Warp! 🎉**
