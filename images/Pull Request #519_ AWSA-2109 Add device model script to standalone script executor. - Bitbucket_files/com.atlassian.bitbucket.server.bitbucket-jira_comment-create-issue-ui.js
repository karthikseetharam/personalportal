;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-jira:comment-create-issue-ui', location = '/bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-data.js' */
define("bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-data",["exports","bitbucket/util/navbuilder","bitbucket/util/server"],function(b,c,d){Object.defineProperty(b,"__esModule",{value:!0});b.wrappedAjax=b.createIssue=void 0;var e=babelHelpers.interopRequireDefault(c);b.createIssue=function(a,b){b={fields:babelHelpers.extends({},b,{project:{key:a.projectKey},issuetype:{id:+a.issueTypeId}})};var c=(0,d.rest),f=a.commentId;a=a.serverId;a=e.default.rest("jira").addPathComponents("comments",
f,"issues").withParams({applicationId:a}).build();return c({type:"POST",url:a,data:b,statusCode:{400:!1}})};b.wrappedAjax=function(a){a=babelHelpers.extends({},a,{statusCode:{500:!1}});return(0,d.ajax)(a)}});;
;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-jira:comment-create-issue-ui', location = '/bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-dialog.soy' */
// This file was automatically generated from create-issue-dialog.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace bitbucket.internal.feature.jira.createIssue.
 */

if (typeof bitbucket == 'undefined') { var bitbucket = {}; }
if (typeof bitbucket.internal == 'undefined') { bitbucket.internal = {}; }
if (typeof bitbucket.internal.feature == 'undefined') { bitbucket.internal.feature = {}; }
if (typeof bitbucket.internal.feature.jira == 'undefined') { bitbucket.internal.feature.jira = {}; }
if (typeof bitbucket.internal.feature.jira.createIssue == 'undefined') { bitbucket.internal.feature.jira.createIssue = {}; }


bitbucket.internal.feature.jira.createIssue.dialog = function(opt_data, opt_ignored) {
  return '<section role="dialog" id="' + soy.$$escapeHtml(opt_data.id) + '" class="aui-layer aui-dialog2 aui-dialog2-medium" aria-hidden="true" data-aui-remove-on-hide="true" data-aui-modal="true"><header class="aui-dialog2-header"><h2 class="aui-dialog2-header-main">' + soy.$$escapeHtml('Create JIRA issue') + '</h2></header><div class="aui-dialog2-content"></div><footer class="aui-dialog2-footer"><div class="aui-dialog2-footer-actions"><button class="aui-button aui-button-primary confirm-button" disabled>' + soy.$$escapeHtml('Create issue') + '</button><button class="aui-button aui-button-link cancel-button">' + soy.$$escapeHtml('Cancel') + '</button></div></footer></section>';
};
if (goog.DEBUG) {
  bitbucket.internal.feature.jira.createIssue.dialog.soyTemplateName = 'bitbucket.internal.feature.jira.createIssue.dialog';
}
;
;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-jira:comment-create-issue-ui', location = '/bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-dialog.js' */
define("bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-dialog","exports aui jquery lodash bitbucket/util/state bitbucket/internal/feature/comments/utils bitbucket/internal/util/analytics bitbucket/internal/util/client-storage bitbucket/internal/util/events ./create-issue-data".split(" "),function(f,q,r,t,u,v,w,x,y,l){Object.defineProperty(f,"__esModule",{value:!0});f.onReady=function(){(0,c.default)(".aui-page-panel-content").on("click",".issue-create",function(a){a=(0,c.default)(a.target).closest(".comment");
(new z(a,(0,v.getCommentSelection)(a.get(0)),(0,c.default)("body"))).show();return!1})};var m=babelHelpers.interopRequireDefault(q),c=babelHelpers.interopRequireDefault(r),n=babelHelpers.interopRequireDefault(t),p=babelHelpers.interopRequireDefault(u),g=babelHelpers.interopRequireDefault(w),h=babelHelpers.interopRequireDefault(x),A=babelHelpers.interopRequireDefault(y),z=function(){function a(f){var b=this,g=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",d=2<arguments.length&&void 0!==
arguments[2]?arguments[2]:(0,c.default)("body");babelHelpers.classCallCheck(this,a);this.cancelOnEsc=function(a){a.keyCode===m.default.keyCode.ESCAPE&&b.cancel()};this.onSubmit=function(){var a=babelHelpers.extends({},b.form.getContextJSON(),{commentId:b._commentId}),c=b.form.getJSON(!1);b._$save.prop("disabled",!0);b.form.formIsLoading();(0,l.createIssue)(a,c).done(function(c){A.default.trigger("bitbucket.internal.jira.issueCreated",null,c.commentId,c.issueKey);h.default.setItemProgressively(b._contextKey,
a);b._dialog.hide()}).fail(function(a){a=n.default.get(a.responseJSON,"errors",[]).filter(function(a){return a.context&&""!==a.context}).reduce(function(a,b){a[b.context]=b.message;return a},{});b.form.renderErrors(a)}).always(function(){b._$save.prop("disabled",!1);b.form.formLoadingCompleted()})};this.onRequiredFieldsRendered=function(){b._$save.prop("disabled",!1)};this._commentId=f.attr("data-id");(0,c.default)("#create-jira-issue-dialog").length&&console.error("Found existing element with create-jira-issue-dialog, this is probably a bug.");
d.append(bitbucket.internal.feature.jira.createIssue.dialog({id:"create-jira-issue-dialog"}));this._dialog=m.default.dialog2("#create-jira-issue-dialog");this._$cancel=this._dialog.$el.find(".cancel-button");this._$container=d;this._$save=this._dialog.$el.find(".confirm-button");this._$dialogContent=this._dialog.$el.find(".aui-dialog2-content");this._contextKey=h.default.buildKey("create-jira-issue-context","repo");d=h.default.getItemProgressively(this._contextKey)||{};this.form=new jiraIntegration.JiraCreateIssueForm({container:this._$dialogContent,
allowUnsupportedFields:!0,ignoreFieldsWithDefaultValue:!1,requiredFieldsOnly:!1,onRequiredFieldsRendered:this.onRequiredFieldsRendered,onSubmit:this.onSubmit,ajax:l.wrappedAjax,initialSummary:g,projectId:d.projectId,serverId:d.serverId});this._$container.on("keyup",this.cancelOnEsc);this._$cancel.on("click",function(){b.cancel()});this._$save.on("click",function(){b.form.submit()});this._$dialogContent.on("scroll",n.default.throttle(function(){(0,c.default)(".aui-form-notification-tooltip").hide()},
1E3,{trailing:!1}));var e=p.default.getPullRequest(),k=p.default.getCurrentUser();this._analyticsProperties={"comment.id":this._commentId,"pullRequest.id":e.id,"repository.id":e.toRef.repository.id,userRole:function(){return e.author.user.id===k.id?"author":e.reviewers.some(function(a){return a.user.id===k.id})?"reviewer":e.participants.some(function(a){return a.user.id===k.id})?"paricipant":"other"}()}}babelHelpers.createClass(a,[{key:"show",value:function(){g.default.add("jira.issue.comment.create.opened",
this._analyticsProperties);this._dialog.show()}},{key:"cancel",value:function(){g.default.add("jira.issue.comment.create.cancelled",this._analyticsProperties);this._$container.off("keyup",this.cancelOnEsc);this._dialog.hide()}}]);return a}()});;
;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-jira:comment-create-issue-ui', location = '/bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-init.js' */
jQuery(document).ready(function(){require("bitbucket-plugin-jira/internal/feature/jira/create-issue/create-issue-dialog").onReady()});;
//# sourceMappingURL=/download/batch/com.atlassian.bitbucket.server.bitbucket-jira:comment-create-issue-ui/com.atlassian.bitbucket.server.bitbucket-jira:comment-create-issue-ui.js.map?_statichash=f9168ef5d0e58058e37c58aede41c2e8-T%2F-1609296852%2Fcad3c23%2F10%2F5.6.6&locale=en-US