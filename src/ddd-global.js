// load DDD design system globally
import "@haxtheweb/d-d-d/d-d-d.js";

if (
  globalThis.DDDSharedStyles &&
  globalThis.DDDSharedStyles.requestAvailability
) {
  globalThis.DDDSharedStyles.requestAvailability();
}
