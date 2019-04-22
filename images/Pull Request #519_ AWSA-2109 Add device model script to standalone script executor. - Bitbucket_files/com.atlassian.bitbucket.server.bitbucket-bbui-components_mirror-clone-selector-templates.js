;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-bbui-components:mirror-clone-selector-templates', location = '/static/bitbucket/internal/bbui/mirror-clone-selector/mirror-clone-selector.soy' */
// This file was automatically generated from mirror-clone-selector.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace bitbucket.internal.component.mirroringCloneSelector.
 */

if (typeof bitbucket == 'undefined') { var bitbucket = {}; }
if (typeof bitbucket.internal == 'undefined') { bitbucket.internal = {}; }
if (typeof bitbucket.internal.component == 'undefined') { bitbucket.internal.component = {}; }
if (typeof bitbucket.internal.component.mirroringCloneSelector == 'undefined') { bitbucket.internal.component.mirroringCloneSelector = {}; }


bitbucket.internal.component.mirroringCloneSelector.main = function(opt_data, opt_ignored) {
  return '<form class="aui mirroring-clone-selector"><label id="clone-from-label" for="available-mirrors-trigger">' + soy.$$escapeHtml('Clone from') + '</label><button id="available-mirrors-trigger" href="#available-mirrors" aria-owns="available-mirrors" aria-haspopup="true" class="aui-style-default aui-dropdown2-trigger aui-button aui-button-link" disabled>' + soy.$$escapeHtml(opt_data.primary.mirrorName) + '</button><div id="available-mirrors" class="aui-style-default aui-dropdown2"><ul id="available-mirror-list" class="aui-list-truncate">' + bitbucket.internal.component.mirroringCloneSelector.mirrorItem({item: opt_data.primary, extraClasses: 'primary'}) + '</ul></div><div id="update-push-url-container" class="hidden"><div class="aui-message aui-message-info message-subtle"><p>' + soy.$$escapeHtml(soydata.VERY_UNSAFE.ordainSanitizedHtml(AJS.format('Use this command to \x3ca href\x3d\x22{0}\x22 target\x3d\x22_blank\x22\x3eupdate your push URL\x3c/a\x3e.',typeof ('http:\/\/docs.atlassian.com\/bitbucketserver\/docs-056\/Clone+a+repository?utm_campaign=in-app-help&utm_medium=in-app-help&utm_source=stash#Clonearepository-mirrorclone') === 'number' ? 'http:\/\/docs.atlassian.com\/bitbucketserver\/docs-056\/Clone+a+repository?utm_campaign=in-app-help&utm_medium=in-app-help&utm_source=stash#Clonearepository-mirrorclone' : soy.$$escapeHtml('http:\/\/docs.atlassian.com\/bitbucketserver\/docs-056\/Clone+a+repository?utm_campaign=in-app-help&utm_medium=in-app-help&utm_source=stash#Clonearepository-mirrorclone')))) + '</p></div><input id="update-push-url-input" type="text" class="text quick-copy-text" readonly="readonly" spellcheck="false" /></div></form>';
};
if (goog.DEBUG) {
  bitbucket.internal.component.mirroringCloneSelector.main.soyTemplateName = 'bitbucket.internal.component.mirroringCloneSelector.main';
}


bitbucket.internal.component.mirroringCloneSelector.mirrorItem = function(opt_data, opt_ignored) {
  return '<li class="mirror-item ' + soy.$$escapeHtml(opt_data.extraClasses ? opt_data.extraClasses : '') + '" data-id="' + soy.$$escapeHtml(opt_data.item.id ? opt_data.item.id : '') + '"><a href="#">' + soy.$$escapeHtml(opt_data.item.mirrorName) + '</a></li>';
};
if (goog.DEBUG) {
  bitbucket.internal.component.mirroringCloneSelector.mirrorItem.soyTemplateName = 'bitbucket.internal.component.mirroringCloneSelector.mirrorItem';
}
;
//# sourceMappingURL=/download/batch/com.atlassian.bitbucket.server.bitbucket-bbui-components:mirror-clone-selector-templates/com.atlassian.bitbucket.server.bitbucket-bbui-components:mirror-clone-selector-templates.js.map?_statichash=688fb2e958d7c18c4bd0ef9ad0e83b6a-CDN%2F-1609296852%2Fcad3c23%2F10%2F1.0.0&locale=en-US