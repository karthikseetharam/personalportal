;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-jira:jira-issue-list', location = '/bitbucket-plugin-jira/internal/feature/jira/issue-list/jira-issue-list.soy' */
// This file was automatically generated from jira-issue-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace jira.issues.
 */

if (typeof jira == 'undefined') { var jira = {}; }
if (typeof jira.issues == 'undefined') { jira.issues = {}; }


jira.issues.issueList = function(opt_data, opt_ignored) {
  var output = '<div class="jira-issue-list-container">';
  if (opt_data.issues.length > 0) {
    if (opt_data.triggerOnly) {
      output += '<div class="jira-issue-list-trigger-item">' + aui.icons.icon({icon: 'jira', useIconFont: true}) + jiraIntegration.templates.trigger.issuesTrigger({issues: opt_data.issues, className: 'jira-issue-list-trigger'}) + '</div>';
    } else {
      output += '<ul class="jira-issue-list">';
      var issueList18 = opt_data.issues;
      var issueListLen18 = issueList18.length;
      for (var issueIndex18 = 0; issueIndex18 < issueListLen18; issueIndex18++) {
        var issueData18 = issueList18[issueIndex18];
        output += '<li>' + aui.icons.icon({icon: 'jira', useIconFont: true}) + jiraIntegration.templates.trigger.issuesTrigger({issues: opt_data.issues, className: 'jira-issue-list-trigger', displayedIssue: issueData18}) + '</li>';
      }
      output += '</ul>';
    }
  }
  output += '</div>';
  return output;
};
if (goog.DEBUG) {
  jira.issues.issueList.soyTemplateName = 'jira.issues.issueList';
}
;
;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-jira:jira-issue-list', location = '/bitbucket-plugin-jira/internal/feature/jira/issue-list/jira-issue-list.js' */
define("bitbucket-plugin-jira/internal/feature/jira/issue-list/jira-issue-list",["exports","jquery","../dialog/dialog"],function(a,c,d){Object.defineProperty(a,"__esModule",{value:!0});a.renderJiraIssueList=a.addIssueListDialog=void 0;var e=babelHelpers.interopRequireDefault(c),f=babelHelpers.interopRequireDefault(d);a.addIssueListDialog=function(){new f.default({id:"jira-issue-list-dialog",triggerSelector:".jira-issue-list-trigger"})};a.renderJiraIssueList=function(a,b){b=(0,e.default)(jira.issues.issueList({issues:b||
{},triggerOnly:!0}));a.replaceWith(b);return b}});;
//# sourceMappingURL=/download/batch/com.atlassian.bitbucket.server.bitbucket-jira:jira-issue-list/com.atlassian.bitbucket.server.bitbucket-jira:jira-issue-list.js.map?_statichash=f9168ef5d0e58058e37c58aede41c2e8-CDN%2F-1609296852%2Fcad3c23%2F10%2F5.6.6&locale=en-US