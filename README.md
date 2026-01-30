# CI/CD Pipeline Configuration

Build and deploy pipeline configuration for automated CI/CD.

## Features

- Build step for application compilation
- Test step for running tests
- Deploy step for deployment to production
- Support for multiple CI/CD platforms (GitHub Actions, GitLab CI, Jenkins)

## Setup

1. Configure CI/CD platform:
   - GitHub Actions: `.github/workflows/ci-cd.yml`
   - GitLab CI: `.gitlab-ci.yml`
   - Jenkins: `jenkins/Jenkinsfile`

2. Update deployment configuration in `config/deploy.yml`

3. Run deployment:
```bash
./scripts/deploy.sh production
```

## Pipeline Stages

1. **Build** - Compiles application and builds Docker images
2. **Test** - Runs test suite
3. **Deploy** - Deploys to production environment

## Configuration Files

- `.github/workflows/ci-cd.yml` - GitHub Actions workflow
- `.gitlab-ci.yml` - GitLab CI configuration
- `jenkins/Jenkinsfile` - Jenkins pipeline
- `Dockerfile` - Docker image build
- `docker-compose.yml` - Docker Compose configuration
- `config/deploy.yml` - Deployment configuration
- `scripts/deploy.sh` - Deployment script

## Project Structure

```
.github/workflows/
└── ci-cd.yml              # GitHub Actions workflow
.gitlab-ci.yml             # GitLab CI configuration
jenkins/
└── Jenkinsfile            # Jenkins pipeline
Dockerfile                 # Docker image
docker-compose.yml         # Docker Compose
config/
└── deploy.yml             # Deployment config
scripts/
├── deploy.sh              # Deployment script
├── rollback.sh            # Rollback script (unused)
└── lint.sh                # Linting script (unused)
```
