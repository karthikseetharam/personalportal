;
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form.js' */
window.jiraIntegration=window.jiraIntegration||{};window.jiraIntegration.JiraCreateIssueForm=(function(d,a){b.defaults={allowUnsupportedFields:false,ignoreFieldsWithDefaultValue:true,excludedField:["project","issuetype","reporter"],formClass:"jira-interation-create-issue-form",requiredFieldsOnly:true,renderSummaryAndDescription:false,get$unsupportedFieldMessage:function(f,g){return d(jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage({unsupportedFields:f,createIssueUrl:g}))},get$unexpectedError:function(f){return d(aui.message.error({content:AJS.escapeHtml(f)}))},get$communicationError:function(f){return d(jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage({message:f}))},get$unauthorizeMessage:function(f){return d(jiraIntegration.templates.jiraCreateIssueForm.authorize({extraClasses:"jira-oauth-dialog",applicationName:f}))},get$unsupportedServerMessage:function(f){return d(jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage({serverUrl:f}))},get$unrenderableRequiredFieldsMessage:function(g,f){var h=g.map(function(i){return i.name}).join(", ");return d(jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage({names:h,count:g.length,serverUrl:f}))},ajax:function(f){alert("JiraCreateIssueForm requires the option 'ajax(options)' to be specified and respond like jQuery.ajax.\nThis method should handle response status codes other than 200 and 500 (those are handled by us).")}};function b(f){this.configuration=a.extend({},b.defaults,f);if(this.configuration.renderSummaryAndDescription){this.configuration.excludedField.push("summary","description")}this._init()}b.prototype._trigger=function(f,g){var h=this.configuration[f];if(h){h.apply(this,Array.prototype.slice.call(arguments,1))}};b.prototype._selectServer=function(f){var g=this;this.currentServerId=f;this.formIsLoading(this.defaultFields.server);jiraIntegration.JiraCreateIssueForm.Data.isIssueCreationSupported(f,this.configuration.ajax).done(function(h){if(h){g._loadProjectData(f);g.formLoadingCompleted(g.defaultFields.server)}else{var i=jiraIntegration.JiraCreateIssueForm.Data.getServerById(f).displayUrl;g._handleUnsupportedServer(i)}}).fail(function(h){if(h[0]&&h[0].authenticationUri){g._handleAuthorizeError(h[0])}else{g._handleAjaxError(h)}})};b.prototype._bindEventListener=function(){var f=this;this.defaultFields.server.on("change",function(h){f.resetForm();var g=this.value;if(g){f._selectServer(g)}else{jiraIntegration.JiraCreateIssueForm.FieldHelper.resetSelectField(f.defaultFields.project);f.defaultFields.project.trigger("change")}f._trigger("onServerChanged",this.value)});this.defaultFields.project.on("change",function(){var g=this.value||d(this).select2("data").value;if(g){d('option[value=""]',f.defaultFields.project).remove();f._loadIssueType(f.currentServerId,g)}else{jiraIntegration.JiraCreateIssueForm.FieldHelper.resetSelectField(f.defaultFields.issueType)}f.resetForm();f.defaultFields.issueType.trigger("change");f._trigger("onProjectChanged",this.value)});this.defaultFields.issueType.on("change",function(){f.resetForm();if(this.value){f._loadFields()}else{f.$containerRequireField&&f.$containerRequireField.html("");c(this.$form)}f._trigger("onTypeChanged",this.value)})};b.prototype._init=function(){this.container=d(this.configuration.container);if(this.container.length){this._renderForm();this._bindEventListener();this._loadServerData()}else{throw new Error("container property should be defined.")}};b.prototype._renderForm=function(){var f=this;this.$form=d(jiraIntegration.templates.jiraCreateIssueForm.form({formClass:this.configuration.formClass})).on("aui-valid-submit",function(g){if(f.configuration.onSubmit){g.preventDefault();f.configuration.onSubmit()}}).on("focus",".fake-tabbable",function(){const g=this.parentElement.children[1].getElementsByTagName("input")[0];d(g).focus()});if(this.configuration.renderSummaryAndDescription){this._renderSummaryAndDescription()}this.container.append(this.$form);this.defaultFields=this._getDefaultFields();a.each(this.defaultFields,a.bind(function(g){this.createSelect2WithIcon(d(g))},this));this.$containerRequireField=d(".create-issue-required-fields",this.container);this._trigger("onFormRendered")};b.prototype._renderSummaryAndDescription=function(){var f=d(".create-issue-default-fields",this.$form);f.append(aui.form.textField({labelContent:"Summary",isRequired:true,name:"summary",value:this._getSummaryFromConfiguration()}));f.append(aui.form.textareaField({labelContent:"Description",name:"description"}))};b.prototype._getDefaultFields=function(){return{server:d(".server-select",this.$form),project:d(".project-select",this.$form),issueType:d(".issuetype-select",this.$form)}};b.prototype._loadServerData=function(){var f=this;this.formIsLoading(this.defaultFields.server);jiraIntegration.JiraCreateIssueForm.Data.loadServers(f.configuration.ajax).then(function(g){f.formLoadingCompleted(f.defaultFields.server);f._loadServerDataComplete(g)})};b.prototype._loadFields=function(){var g=this;var f=this.getContextJSON();this.formIsLoading(this.defaultFields.issueType);var h=jiraIntegration.JiraCreateIssueForm.Data.getFieldMetadata(f,g.configuration.ajax);h.done(function(m){var i=g._filterFields(m.fields);if(g.configuration.renderSummaryAndDescription){var j=m.fields.description;var l=!!(j&&j.required);g._setDescriptionAsRequiredField(l)}var k=g._unrenderableRequiredFields(i);if(k.length===0){g._renderFields(i,f);g._trigger("onFieldsRendered")}else{g._handleUnrenderableRequiredFields(k)}g._fieldTypeAnalytics(i);g.formLoadingCompleted(g.defaultFields.issueType)}).fail(a.bind(g._handleAjaxError,this))};b.prototype._loadServerDataComplete=function(f){if(f.length){if(f.length===1){jiraIntegration.JiraCreateIssueForm.FieldHelper.hideField(this.defaultFields.server)}this._hasMultiServer=f.length>1;jiraIntegration.JiraCreateIssueForm.FieldHelper.fillSelectData(this.defaultFields.server,f,this.configuration.serverId||f[0].id);this._selectServer(this.configuration.serverId||f[0].id)}else{this._handlerUnexpectedError("Don\u0027t have any JIRA server, please check the application link configuration.")}};b.prototype._loadProjectData=function(f){var g=this;this.formIsLoading(this.defaultFields.project);var h=jiraIntegration.JiraCreateIssueForm.Data.loadProjects(f,g.configuration.ajax);h.then(function(i){if(i.errors&&i.errors.length){var j=i.errors[0];if(j.authenticationUri){g._handleAuthorizeError(j)}else{g._handlerUnexpectedError(j.message)}}else{if(i.length){jiraIntegration.JiraCreateIssueForm.FieldHelper.fillSelectData(g.defaultFields.project,i,g.configuration.projectId)}else{g._handlerUnexpectedError("You do not have permission to create issues on this JIRA server.")}}g.formLoadingCompleted(g.defaultFields.project)},a.bind(g._handleAjaxError,this))};b.prototype._loadIssueType=function(g,f){var h=jiraIntegration.JiraCreateIssueForm.Data.getIssueTypes(g,f,this.configuration.ajax);jiraIntegration.JiraCreateIssueForm.FieldHelper.fillSelectData(this.defaultFields.issueType,h)};b.prototype._fieldTypeAnalytics=function(f){var h=f.map(function(j){var i=jiraIntegration.fields.getFieldType(j);return{required:j.required,restType:i,knownRestType:jiraIntegration.fields.isKnownRestType(i),}});var g=h.reduce(function(i,j){if(j.knownRestType){i[j.required?"requiredFields":"otherFields"].push(j.restType)}else{i[j.required?"unknownRequiredFieldsCount":"unknownOtherFieldsCount"]++}return i},{requiredFields:[],otherFields:[],unknownRequiredFieldsCount:0,unknownOtherFieldsCount:0});g=Object.keys(g).reduce(function(k,m){var n=g[m];if(!Array.isArray(n)){k[m]=n;return k}var j=n.length;k[m+".size"]=j;for(var l=0;l<j;l++){k[m+"["+l+"]"]=n[l]}return k},{});AJS.trigger("analytics",{name:"jira.integration.issue.create.form.displayed",data:g,})};b.prototype._renderFields=function(f,g){this.$containerRequireField.html("");var h=a.reject(f,jiraIntegration.fields.canRender);if(!this.configuration.allowUnsupportedFields&&h.length){this._handleUnsupportedFields(h)}else{this.$containerRequireField.html(a.map(f,function(i){return jiraIntegration.fields.renderField(null,i,g,null)}).join(""));jiraIntegration.fields.attachFieldBehaviors(this.$containerRequireField,{serverId:g.serverId,projectKey:g.projectKey},null);this._trigger("onRequiredFieldsRendered",f,h)}};b.prototype._setError=function(f){c(this.$form);this.$form.prepend(f);this.formLoadingCompleted();this.formHasError()};b.prototype._handleCommunicationError=function(g){var f=this.configuration.get$communicationError(g);this._setError(f)};b.prototype._handlerUnexpectedError=function(g){var f=this.configuration.get$unexpectedError(g);this._setError(f)};b.prototype._handleUnsupportedFields=function(f){f=a.map(f,function(h){return AJS.escapeHtml(h.name)});var g=this.configuration.get$unsupportedFieldMessage(f,this._getCreateJiraIssueUrl());c(this.$form);this.$form.prepend(g);this._trigger("onError");this.formLoadingCompleted()};b.prototype._handleUnsupportedServer=function(f){var g=this.configuration.get$unsupportedServerMessage(f);this._setError(g)};b.prototype._handleAjaxError=function(i){var h=this;if(i.status>=500&&i.status<600){var f=(i.responseJSON.errors&&i.responseJSON.errors[0]);var g=f&&f.exceptionName;if(g&&g==="com.atlassian.integration.jira.JiraCommunicationException"){this._handleCommunicationError(f.message)}else{h._handlerUnexpectedError(AJS.format("Could not communicate with JIRA (HTTP error {0})",i.status))}}else{h._handlerUnexpectedError("An unexpected response was received from JIRA.")}h.formHasError()};b.prototype._handleAuthorizeError=function(h){var g=this;this.formHasError();var f=this.configuration.get$unauthorizeMessage(h.applicationName);this.$form.append(f);d(".applink-authenticate",f).on("click",function(i){AppLinks.authenticateRemoteCredentials(h.authenticationUri,function(){g.resetForm();g._selectServer(g.currentServerId)},function(){g._handlerUnexpectedError(AJS.format("You have refused to permit access to {0}.",h.applicationName))});i.preventDefault()})};b.prototype._handleUnrenderableRequiredFields=function(f){var g=this.configuration.get$unrenderableRequiredFieldsMessage(f,this._getCreateJiraIssueUrl());c(this.$form);this.$form.append(g);this.formLoadingCompleted()};b.prototype._getCreateJiraIssueUrl=function(){var h=this.defaultFields.project.find("option:selected").val();var i=this.defaultFields.issueType.find("option:selected").val();var j=jiraIntegration.JiraCreateIssueForm.Data.getServerById(this.currentServerId).displayUrl;j=j+"/secure/CreateIssueDetails!Init.jspa?pid="+h+"&issuetype="+i;var g=this._getFieldValue("summary");if(g.length){j=j+"&summary="+encodeURIComponent(g)}var f=this._getFieldValue("description");if(f.length){j=j+"&description="+encodeURIComponent(f)}return j};b.prototype._filterFields=function(f){var g=this;return a.filter(f,function(j){var i=j.schema?(j.schema.system||j.schema.custom||j.schema.customId):j;var h=a.contains(g.configuration.excludedField,i)||(g.configuration.ignoreFieldsWithDefaultValue&&j.hasDefaultValue)||(g.configuration.requiredFieldsOnly&&!j.required);return !h})};b.prototype._unrenderableRequiredFields=function(f){return f.filter(function(g){return g.required&&!jiraIntegration.fields.canRender(g)})};b.prototype._getFieldValue=function(g){var f=d("[name='"+g+"']",this.$form);return(f)?d.trim(f.val()):""};b.prototype._setDescriptionAsRequiredField=function(f){var g=d('.field-group [name="description"]',this.$form).prev("label");g.find(".aui-icon.aui-icon-required").remove();if(f){g.append(aui.icons.icon({icon:"required"}))}};b.prototype._getSummaryFromConfiguration=function(){var f=this.configuration.initialSummary;delete this.configuration.initialSummary;return f};b.prototype.resetForm=function(){c(this.$form);d(".field-group",this.$form).show();if(this.configuration.renderSummaryAndDescription){this._setDescriptionAsRequiredField(false)}if(!this._hasMultiServer){jiraIntegration.JiraCreateIssueForm.FieldHelper.hideField(this.defaultFields.server)}this.$containerRequireField.html("")};b.prototype.formHasError=function(){d(".field-group",this.$form).hide();this.$containerRequireField.html("");if(this._hasMultiServer){jiraIntegration.JiraCreateIssueForm.FieldHelper.showField(this.defaultFields.server)}jiraIntegration.JiraCreateIssueForm.FieldHelper.setFieldDisabled(d(".insert-issue-button"),true);this._trigger("onError");this.formLoadingCompleted()};b.prototype.getCurrentServer=function(){return jiraIntegration.JiraCreateIssueForm.Data.getServerById(this.currentServerId)};b.prototype.formIsLoading=function(f){if(f){jiraIntegration.JiraCreateIssueForm.FieldHelper.setIsLoading(f,true)}var g=d(":input",d(this.$form));jiraIntegration.JiraCreateIssueForm.FieldHelper.setFieldDisabled(g,true)};b.prototype.formLoadingCompleted=function(f){if(f){jiraIntegration.JiraCreateIssueForm.FieldHelper.setIsLoading(f,false)}else{d(".aui-icon.aui-icon-wait",this.$form).remove()}var g=d(":input",d(this.$form));jiraIntegration.JiraCreateIssueForm.FieldHelper.setFieldDisabled(g,false)};b.prototype.createSelect2WithIcon=function(f){if(f.is(".server-select")){f.auiSelect2({minimumResultsForSearch:-1})}else{var g=f.is(".project-select")?{formatSelection:this.projectSelectFormat,formatResult:this.projectSelectFormat,extraAttributes:this.defaultFields}:{formatSelection:this.issueTypeSelectFormat,formatResult:this.issueTypeSelectFormat,minimumResultsForSearch:-1,extraAttributes:this.defaultFields};f.auiSelect2(g)}f.auiSelect2("val","")};b.prototype.projectSelectFormat=function(h){var g=this.extraAttributes.server.select2("data").id;var f=jiraIntegration.JiraCreateIssueForm.Data.getProjectIconUrl(g,h.id);return jiraIntegration.templates.fields.select2WithIconOption({optionValue:h.text,iconUrl:f,isProject:true})};b.prototype.issueTypeSelectFormat=function(i){var h=this.extraAttributes.server.select2("data").id;var f=this.extraAttributes.project.select2("data").id;var g=jiraIntegration.JiraCreateIssueForm.Data.getIssueTypeIconUrl(h,f,i.id);return jiraIntegration.templates.fields.select2WithIconOption({optionValue:i.text,iconUrl:g,isProject:false})};b.prototype.getContextJSON=function(){var f=this.defaultFields.project.val()||d(this.defaultFields.project).select2("data").value;return{serverId:this.currentServerId,projectId:f,projectKey:jiraIntegration.JiraCreateIssueForm.Data.getProjectById(this.currentServerId,f).key,issueTypeId:this.defaultFields.issueType.val(),summary:this._getSummaryFromConfiguration()}};b.prototype.getJSON=function(f){if(!f){return e(this.$form,function(l,j,k){return jiraIntegration.fields.getJSON(l)})}var h=jiraIntegration.JiraCreateIssueForm.Data.getCachedFieldMetadataEntry(this.getContextJSON()).value;var g=Object.keys(h.fields).reduce(function(k,j){var i=h.fields[j];k[j]=jiraIntegration.fields.getContext(null,i,null,null);return k},{});return e(this.$form,function(m,j,l){var k=g[j];return{name:j,jiraType:k.jiraType,required:k.isRequired,label:k.labelText,value:jiraIntegration.fields.getJSON(m),index:l}})};b.prototype.renderErrors=function(f){e(this.$form,function(g,j){var k=g.closest(".jira-field");var i=function(l){return l.indexOf(j)===0};var h;if(f.hasOwnProperty(j)||Object.keys(f).some(i)){if(!f.hasOwnProperty(j)){j=Object.keys(f).filter(i)[0]}h=Array.isArray(f[j])?f[j]:[f[j]]}jiraIntegration.fields.setFieldError(k,h)})};b.prototype.submit=function(){this.$form.submit()};function e(f,h){var g={};f.find(".create-issue-required-fields").find("input, select, textarea").not(".select2-input, .select2-focusser").each(function(k){var l=d(this);var j=l.attr("name");g[j]=h(l,j,k)});return g}function c(f){d(".aui-message",f).remove()}return b})(AJS.$,window._);;
;
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form-data.js' */
window.jiraIntegration=window.jiraIntegration||{};var jiraIntegration=window.jiraIntegration;jiraIntegration.JiraCreateIssueForm=jiraIntegration.JiraCreateIssueForm||{};jiraIntegration.JiraCreateIssueForm.Data=(function(d){var j={};var l={};var q=AJS.contextPath()+"/plugins/servlet/jira-integration/icons?serverId={0}&iconType={1}&{2}";var m=[];var p=function(s,t){return s({dataType:"json",timeout:0,url:AJS.contextPath()+"/rest/jira-integration/1.0/servers"+(t||"")})};function o(s){return p(s,"").done(function(t){t.forEach(function(u){j[u.id]=u})})}function i(s,u){var t=j[s]&&j[s].projects;if(t){return d.Deferred().resolve(t)}return p(u,"/"+s+"/projects").done(function(v){if(v.length){v.forEach(function(z){var y=z.issuetypes.filter(function(A){return !A.subtask});z.issueTypes=y;var w={};y.forEach(function(A){w[A.id]=A.iconUrl});var x=z.avatarUrls["16x16"].split("/secure/projectavatar?")[1];if(x.indexOf("pid=")===-1){x=x+"&pid="+z.id}m[e(s,z.id)]={iconUrl:AJS.format(q,s,"project",x),issueTypes:w}});j[s].projects=v}})}function r(t,s){var u=h(t).filter(function(v){return v.id===s})[0];return u?u.issueTypes:[]}function f(s,t){var u=b(s);if(u.value){return d.Deferred().resolve(u.value)}return p(t,"/"+s.serverId+"/projects/"+s.projectKey+"/issue-types/"+s.issueTypeId+"/fields-meta").done(function(v){l[u.key]=v})}function b(t){var s=e(t.serverId,t.projectKey,t.issueTypeId);return{key:s,value:l[s]}}function n(s){return j[s]}function g(s,t){if(!j[s]){throw new Error("Can only be called after server is loaded.")}if("issueCreationSupported" in j[s]){return d.Deferred().resolve(j[s].issueCreationSupported)}return p(t,"/"+s+"/features").then(function(u){if(u.errors){return d.Deferred().reject(u.errors)}else{if(!Array.isArray(u)){return d.Deferred().reject("Unexpected response from JIRA")}}j[s].issueCreationSupported=u.indexOf("CREATE_ISSUE")!==-1;return j[s].issueCreationSupported})}function h(s){if(!j[s]){throw new Error("Can only be called after server is loaded.")}return j[s].projects}function k(u,t){var w=h(u);if(!w){return null}for(var v=0,s=w.length;v<s;v++){var x=w[v];if(x.id===t){return x}}return null}function a(t,s){var u=e(t,s);return m[u]?m[u].iconUrl:""}function c(u,t,v){var w=e(u,t);var s=m[w];return(s&&s.issueTypes[v])?s.issueTypes[v]:""}function e(t,s,u){return t+(s?"-"+s:"")+(u?"-"+u:"")}return{loadServers:o,loadProjects:i,getIssueTypes:r,getFieldMetadata:f,getCachedFieldMetadataEntry:b,getServerById:n,getProjectIconUrl:a,getIssueTypeIconUrl:c,getProjects:h,getProjectById:k,isIssueCreationSupported:g}})(AJS.$);;
;
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form-field-helper.js' */
var jiraIntegration=window.jiraIntegration||{};jiraIntegration.JiraCreateIssueForm=jiraIntegration.JiraCreateIssueForm||{};jiraIntegration.JiraCreateIssueForm.FieldHelper=(function(c,h){function e(j,m,k){var n=k?[]:[a(j)];var l;m.forEach(function(p){var o={value:p.id,text:p.name,iconUrl:p.iconUrl?p.iconUrl:(p.avatarUrls?p.avatarUrls["16x16"]:"")};if(k===p.id){o.selected=true;l=p}n.push(aui.form.optionOrOptgroup(o))});j.html(n.join(""));if(l){l.text=l.name;j.auiSelect2("data",l).trigger("change")}else{j.auiSelect2("val","").trigger("change")}}function b(j){j.html(a(j));j.auiSelect2("val","").trigger("change")}function a(j){var k=j.attr("data-placeholder");return aui.form.optionOrOptgroup({value:"",text:k,iconUrl:""})}function i(j){j.parent().hide()}function d(j){j.parent().show()}function f(k,j){j?c.fn.disable?k.disable():k.prop("disabled",true):c.fn.enable?k.enable():k.prop("disabled",false)}function g(k,j){return j?k.after(aui.icons.icon({icon:"wait"})):k.next(".aui-icon.aui-icon-wait").remove()}return{fillSelectData:e,resetSelectField:b,hideField:i,showField:d,setFieldDisabled:f,setIsLoading:g}})(AJS.$,window._);;
;
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form.soy' */
// This file was automatically generated from jira-create-issue-form.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace jiraIntegration.templates.jiraCreateIssueForm.
 */

if (typeof jiraIntegration == 'undefined') { var jiraIntegration = {}; }
if (typeof jiraIntegration.templates == 'undefined') { jiraIntegration.templates = {}; }
if (typeof jiraIntegration.templates.jiraCreateIssueForm == 'undefined') { jiraIntegration.templates.jiraCreateIssueForm = {}; }


jiraIntegration.templates.jiraCreateIssueForm.form = function(opt_data, opt_ignored) {
  return '' + aui.form.form({extraClasses: (opt_data.formClass ? opt_data.formClass + ' ' : '') + 'jira-create-form', method: 'post', action: '#', content: '<fieldset class="create-issue-default-fields"><div class="fake-tabbable" tabindex="0" /><div class="field-group" data-jira-type="server"><label>' + soy.$$escapeHtml('Server') + '<span class="aui-icon icon-required"> required</span></label><select class="jira-select2-drop-box server-select medium-long-field" name="server" data-placeholder="' + soy.$$escapeHtml('Select a server') + '"><option disabled selected value="">' + soy.$$escapeHtml('Select a server') + '</option></select></div><div class="field-group" data-jira-type="project"><label>' + soy.$$escapeHtml('Project') + '<span class="aui-icon icon-required"> required</span></label><select class="jira-select2-drop-box project-select medium-long-field" name="project" data-placeholder="' + soy.$$escapeHtml('Select a project') + '"><option disabled selected value="">' + soy.$$escapeHtml('Select a project') + '</option></select></div><div class="field-group" data-jira-type="issuetype"><label>' + soy.$$escapeHtml('Issue Type') + '<span class="aui-icon icon-required"> required</span></label><select class="jira-select2-drop-box issuetype-select" name="issue-type" data-placeholder="' + soy.$$escapeHtml('Select an issue type') + '"><option disabled selected value="">' + soy.$$escapeHtml('Select an issue type') + '</option></select></div></fieldset><fieldset class="create-issue-required-fields"></fieldset>'});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.form.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.form';
}


jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage = function(opt_data, opt_ignored) {
  var param28 = '';
  if (opt_data.unsupportedFields.length == 1) {
    var field__soy31 = '<strong>' + soy.$$escapeHtml(opt_data.unsupportedFields) + '</strong>';
    param28 += soy.$$filterNoAutoescape(AJS.format('The required field {0} is not available in this form. You will need to',field__soy31));
  } else {
    var fieldList__soy38 = '' + jiraIntegration.templates.jiraCreateIssueForm.buildFieldList({fields: opt_data.unsupportedFields});
    param28 += soy.$$filterNoAutoescape(AJS.format('The required fields {0} are not available in this form. You will need to',fieldList__soy38));
  }
  param28 += ' <a href="' + soy.$$escapeHtml(opt_data.createIssueUrl) + '" target="_blank">' + soy.$$escapeHtml('create your issue directly in JIRA') + '</a>.';
  var output = '' + aui.message.warning({content: param28});
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage';
}


jiraIntegration.templates.jiraCreateIssueForm.buildFieldList = function(opt_data, opt_ignored) {
  var output = '';
  var joinText__soy50 = '' + ((opt_data.fields.length == 2) ? ' ' + soy.$$escapeHtml('and') + ' ' : ', ');
  var fieldList58 = opt_data.fields;
  var fieldListLen58 = fieldList58.length;
  for (var fieldIndex58 = 0; fieldIndex58 < fieldListLen58; fieldIndex58++) {
    var fieldData58 = fieldList58[fieldIndex58];
    output += ((! (fieldIndex58 == 0)) ? soy.$$escapeHtml(joinText__soy50) : '') + '<strong>' + soy.$$escapeHtml(fieldData58) + '</strong>';
  }
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.buildFieldList.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.buildFieldList';
}


jiraIntegration.templates.jiraCreateIssueForm.authorize = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  var applicationNameEscaped__soy67 = '' + soy.$$escapeHtml(opt_data.applicationName);
  output += aui.message.info({content: '' + soy.$$filterNoAutoescape(AJS.format('{0}Log in and approve{1} to retrieve data from {2}','<a class="oauth-init applink-authenticate" href="#">','</a>',applicationNameEscaped__soy67))});
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.authorize.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.authorize';
}


jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage = function(opt_data, opt_ignored) {
  return '' + aui.message.warning({content: '' + soy.$$filterNoAutoescape(AJS.format('The version of selected JIRA server is not supported. You may want to upgrade to at least version 5.x or {0}create issue in JIRA{1}.','<a href="' + opt_data.serverUrl + '" target="_blank">','</a>'))});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage';
}


jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage = function(opt_data, opt_ignored) {
  return '' + aui.message.warning({content: '' + soy.$$filterNoAutoescape(AJS.format('The required {1,choice,1#field|1\x3cfields} \x3cstrong\x3e{0}\x3c/strong\x3e {1,choice,1#is|1\x3care} not available in this dialog. You will need to {2}create your issue directly in JIRA{3}.',opt_data.names,opt_data.count,'<a href="' + opt_data.serverUrl + '" target="_blank">','</a>'))});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage';
}


jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage = function(opt_data, opt_ignored) {
  return '' + aui.message.error({titleContent: '' + soy.$$escapeHtml('Unfortunately, we\x27ve encountered problems connecting to JIRA'), content: '<p>' + soy.$$escapeHtml(opt_data.message) + '</p>'});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage';
}
;
//# sourceMappingURL=/download/batch/com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form/com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form.js.map?_statichash=f9168ef5d0e58058e37c58aede41c2e8-CDN%2F-1609296852%2Fcad3c23%2F10%2F5.0.1&locale=en-US