var expect = require('chai').expect;
var CI = require('../src/ci');

describe('screener-runner/src/ci', function() {
  describe('CI.getVars', function() {
    it('should return build/branch from Jenkins', function() {
      process.env = {
        JENKINS_URL: 'jenkins-url',
        BUILD_NUMBER: 'jenkins-build',
        GIT_BRANCH: 'jenkins-branch',
        GIT_COMMIT: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'jenkins-build',
        branch: 'jenkins-branch',
        commit: 'commit'
      });
    });

    it('should return build/branch from CircleCI', function() {
      process.env = {
        CI: 'true',
        CIRCLECI: 'true',
        CIRCLE_BUILD_NUM: 'circle-build',
        CIRCLE_BRANCH: 'circle-branch',
        CIRCLE_SHA1: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'circle-build',
        branch: 'circle-branch',
        commit: 'commit'
      });
    });

    it('should return build/branch from Travis CI', function() {
      process.env = {
        CI: 'true',
        TRAVIS: 'true',
        TRAVIS_BUILD_NUMBER: 'travis-build',
        TRAVIS_BRANCH: 'travis-branch',
        TRAVIS_COMMIT: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'travis-build',
        branch: 'travis-branch',
        commit: 'commit'
      });
    });

    it('should return build/branch from Codeship', function() {
      process.env = {
        CI: 'true',
        CI_NAME: 'codeship',
        CI_BUILD_NUMBER: 'codeship-build',
        CI_BRANCH: 'codeship-branch',
        CI_COMMIT_ID: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'codeship-build',
        branch: 'codeship-branch',
        commit: 'commit'
      });
    });

    it('should return branch from Bitbucket Pipelines', function() {
      process.env = {
        BITBUCKET_COMMIT: 'commit',
        BITBUCKET_BRANCH: 'bitbucket-branch'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        branch: 'bitbucket-branch',
        commit: 'commit'
      });
    });

    it('should return build/branch from Drone', function() {
      process.env = {
        CI: 'true',
        DRONE: 'true',
        DRONE_BUILD_NUMBER: 'drone-build',
        DRONE_BRANCH: 'drone-branch',
        DRONE_COMMIT: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'drone-build',
        branch: 'drone-branch',
        commit: 'commit'
      });
    });

    it('should return build/branch from Semaphore', function() {
      process.env = {
        CI: 'true',
        SEMAPHORE: 'true',
        SEMAPHORE_BUILD_NUMBER: 'semaphore-build',
        BRANCH_NAME: 'semaphore-branch',
        REVISION: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'semaphore-build',
        branch: 'semaphore-branch',
        commit: 'commit'
      });
    });

    it('should return build/branch from GitLab', function() {
      process.env = {
        CI: 'true',
        GITLAB_CI: 'true',
        CI_JOB_ID: 'gitlab-build',
        CI_COMMIT_REF_NAME: 'gitlab-branch',
        CI_COMMIT_SHA: 'commit'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({
        build: 'gitlab-build',
        branch: 'gitlab-branch',
        commit: 'commit'
      });
    });

    it('should return empty object if no matches', function() {
      process.env = {
        CI: 'true',
        OTHER: 'true',
        BUILD_NUMBER: 'other-build',
        BRANCH_NAME: 'other-branch'
      };
      var result = CI.getVars();
      expect(result).to.deep.equal({});
    });
  });

  describe('CI.setVars', function() {
    it('should extend empty object with build and branch', function() {
      process.env = {
        CI: 'true',
        CIRCLECI: 'true',
        CIRCLE_BUILD_NUM: 'circle-build',
        CIRCLE_BRANCH: 'circle-branch',
        CIRCLE_SHA1: 'commit'
      };
      var result = CI.setVars({});
      expect(result).to.deep.equal({
        build: 'circle-build',
        branch: 'circle-branch',
        commit: 'commit'
      });
    });

    it('should overwrite source if property is empty string', function() {
      process.env = {
        CI: 'true',
        CIRCLECI: 'true',
        CIRCLE_BUILD_NUM: 'circle-build',
        CIRCLE_BRANCH: 'circle-branch',
        CIRCLE_SHA1: 'commit'
      };
      var result = CI.setVars({branch: ''});
      expect(result).to.deep.equal({
        build: 'circle-build',
        branch: 'circle-branch',
        commit: 'commit'
      });
      result = CI.setVars({build: null});
      expect(result).to.deep.equal({
        build: 'circle-build',
        branch: 'circle-branch',
        commit: 'commit'
      });
    });

    it('should not overwrite source if property already exists', function() {
      process.env = {
        CI: 'true',
        CIRCLECI: 'true',
        CIRCLE_BUILD_NUM: 'circle-build',
        CIRCLE_BRANCH: 'circle-branch',
        CIRCLE_SHA1: 'commit'
      };
      var result = CI.setVars({branch: 'branch'});
      expect(result).to.deep.equal({
        build: 'circle-build',
        branch: 'branch',
        commit: 'commit'
      });
      result = CI.setVars({build: 'build'});
      expect(result).to.deep.equal({
        build: 'build',
        branch: 'circle-branch',
        commit: 'commit'
      });
    });
  });
});
