;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-mirroring-upstream:mirror-clone-url', location = '/static/bitbucket-plugin-mirroring-upstream/internal/fragment/clone-url/clone-url-init.js' */
require(["jquery"],function(a){a(function(){require("bitbucket-plugin-mirroring-upstream/internal/fragment/clone-url/clone-url").onReady()})});;
;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-mirroring-upstream:mirror-clone-url', location = '/static/bitbucket-plugin-mirroring-upstream/internal/fragment/clone-url/clone-url.js' */
define("bitbucket-plugin-mirroring-upstream/internal/fragment/clone-url/clone-url",["aui","jquery","lodash","bitbucket/util/navbuilder","bitbucket/util/state","bitbucket/internal/bbui/mirror-clone-selector/mirror-clone-selector","bitbucket/internal/util/ajax","bitbucket/internal/util/browser-window","bitbucket/internal/util/events",],function(h,d,x,g,e,s,m,i,a){var t;var b={"http-clone-url":"http","ssh-clone-url-default":"ssh","ssh-clone-url-alternate":"ssh",};function p(){return e.getRepository()}function c(){return p().id}function n(){return e.getProject().id}function l(y){return x.compact(x.map(y,function(B){var z=x.get(B,"links.self[0].href");if(z){var A=B.mirrorServer;return{id:A.id,name:A.name,baseUrl:A.baseUrl,url:z,}}return false}))}function j(){return{mirrorName:"Primary server",links:p().links,}}function f(y){if(!t){return}var z=b[y];if(z){t.updateCloneProtocol(z);t.show()}else{t.hide()}}function k(){return d(".clone-url .repository-protocol").text().toLowerCase()}function r(){return m.rest({url:g.rest("mirroring").addPathComponents("repos",c(),"mirrors").build(),statusCode:{"*":false,},}).then(function(y){return l(y.values||[])}).done(function(){a.on("bitbucket.internal.clone.dialog.hidden",t.hideDropdown)})}function w(y){a.trigger("bitbucket.internal.ui.mirroring.mirror.updated",null,{repositoryId:c(),projectId:n(),});m.rest({url:g.rest("mirroring").addPathComponents("account","settings","preferred-mirror").build(),contentType:"application/json",type:y?"POST":"DELETE",statusCode:{"*":false,},data:y,})}function q(z,y){var A=d(".clone-url .clone-url-input");A.val(y).select();a.trigger("bitbucket.internal.feature.repository.clone.mirror.changed",null,z,y)}function v(){if(!t){t=new s(document.getElementById("mirroring-clone-url-container"),{cloneProtocol:k(),getMirrors:r,preferredMirrorId:i.WRM.data.claim("com.atlassian.bitbucket.server.bitbucket-mirroring-upstream:preferred-mirror.preferred-mirror-id"),primary:j(),updateCloneUrl:q,updatePreferredMirror:w,});t.load()}}function o(){a.off("bitbucket.internal.feature.repository.clone.protocol.initial",f);a.off("bitbucket.internal.feature.repository.clone.protocol.changed",f);d(i.document).off("mouseenter focus click","#clone-repo-button",v)}function u(){a.on("bitbucket.internal.feature.repository.clone.protocol.initial",f);a.on("bitbucket.internal.feature.repository.clone.protocol.changed",f);d(i.document).on("mouseenter focus click","#clone-repo-button",v)}return{onReady:u,cleanup:function(){o();t=undefined},}});;
;
/* module-key = 'com.atlassian.bitbucket.server.bitbucket-mirroring-upstream:mirror-clone-url', location = '/static/bitbucket-plugin-mirroring-upstream/internal/fragment/clone-url/clone-url.soy' */
// This file was automatically generated from clone-url.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace bitbucket.mirroring.
 */

if (typeof bitbucket == 'undefined') { var bitbucket = {}; }
if (typeof bitbucket.mirroring == 'undefined') { bitbucket.mirroring = {}; }


bitbucket.mirroring.clone = function(opt_data, opt_ignored) {
  return '<div id="mirroring-clone-url-container"></div>';
};
if (goog.DEBUG) {
  bitbucket.mirroring.clone.soyTemplateName = 'bitbucket.mirroring.clone';
}
;
//# sourceMappingURL=/download/batch/com.atlassian.bitbucket.server.bitbucket-mirroring-upstream:mirror-clone-url/com.atlassian.bitbucket.server.bitbucket-mirroring-upstream:mirror-clone-url.js.map?_statichash=f9168ef5d0e58058e37c58aede41c2e8-T%2F-1609296852%2Fcad3c23%2F10%2F5.6.6&locale=en-US