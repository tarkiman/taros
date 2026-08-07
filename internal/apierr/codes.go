// Package apierr holds the stable error-code constants sent to the
// frontend in every API error response (see internal/web/errors.go's
// apiErrorBody). It exists as its own leaf package — not part of
// internal/web — specifically so internal/quicklinks (and any other
// package below internal/web in the import graph) can attach a code to
// its own errors without an import cycle back to internal/web.
package apierr

// Error codes — the single source of truth consumed by
// web/frontend/src/i18n/en.ts and id.ts's `errors.*` namespace (key names
// match these constants' values exactly, e.g. WrongPassword =
// "wrong_password" ↔ TS `errors.wrong_password`). Grouped by the handler
// file each is used from, matching internal/web's own file layout. Codes
// taking interpolation params are noted; everything else takes none.
const (
	// Shared across many handlers.
	InvalidRequest = "invalid_request" // malformed JSON body

	// handlers_auth.go
	TooManyAttempts     = "too_many_attempts"
	WrongCredentials    = "wrong_credentials"
	TOTPVerifyFailed    = "totp_verify_failed" // params: detail
	WrongTOTP           = "wrong_totp"
	SessionCreateFailed = "session_create_failed" // params: detail

	// Shared by handlers_settings.go and handlers_totp.go (dashboard
	// password re-confirmation, distinct from WrongCredentials/WrongTOTP
	// which are for the *login* form).
	WrongPassword = "wrong_password"

	// handlers_settings.go
	TerminalToggleFailed = "terminal_toggle_failed" // params: detail
	PortRangeInvalid     = "port_range_invalid"
	PortUnavailable      = "port_unavailable"   // params: port, detail
	PortChangeFailed     = "port_change_failed" // params: detail

	// handlers_totp.go
	TOTPCodeMismatch  = "totp_code_mismatch"
	TOTPSetupFailed   = "totp_setup_failed"   // params: detail
	TOTPConfirmFailed = "totp_confirm_failed" // params: detail
	TOTPDisableFailed = "totp_disable_failed" // params: detail

	// handlers_files.go
	PathInvalid         = "path_invalid"          // params: detail
	DirectoryReadFailed = "directory_read_failed" // params: detail
	UnknownAction       = "unknown_action"        // params: action
	FileOpFailed        = "file_op_failed"        // params: detail
	NoItemsSelected     = "no_items_selected"
	ClipboardEmpty      = "clipboard_empty"
	PasteFailed         = "paste_failed"  // params: detail
	UploadFailed        = "upload_failed" // params: detail
	NoFileUploaded      = "no_file_uploaded"
	UploadWriteFailed   = "upload_write_failed" // params: detail

	// handlers_editor.go
	ContentTooLarge   = "content_too_large"   // 413 — frontend already overrides by status, kept for API completeness
	ContentBinary     = "content_binary"      // 415 — same
	ContentReadFailed = "content_read_failed" // params: detail
	ContentConflict   = "content_conflict"    // 409 — frontend already overrides by status, kept for API completeness
	ContentSaveFailed = "content_save_failed" // params: detail

	// handlers_services.go
	ServicesUnsupported = "services_unsupported"
	SystemdUnavailable  = "systemd_unavailable"   // params: detail
	ServiceActionFailed = "service_action_failed" // params: action, name, detail
	ServiceLogsFailed   = "service_logs_failed"   // params: name, detail

	// handlers_docker.go
	DockerDisabled              = "docker_disabled"
	DockerUnreachable           = "docker_unreachable"             // params: detail
	DockerContainerActionFailed = "docker_container_action_failed" // params: action, detail
	DockerImageRemoveFailed     = "docker_image_remove_failed"     // params: detail
	DockerVolumeRemoveFailed    = "docker_volume_remove_failed"    // params: detail
	DockerNetworkRemoveFailed   = "docker_network_remove_failed"   // params: detail
	DockerPruneFailed           = "docker_prune_failed"            // params: kind, detail

	// handlers_system.go / sse.go / handlers_processes.go (shared helper)
	MonitoringUnsupported = "monitoring_unsupported"

	// handlers_quicklinks.go / internal/quicklinks
	QuickLinkNotFound     = "quicklink_not_found"
	QuickLinksSaveFailed  = "quicklinks_save_failed" // params: detail
	MaxLinksReached       = "max_links_reached"      // params: max
	LabelEmpty            = "label_empty"
	LabelTooLong          = "label_too_long" // params: max
	URLEmpty              = "url_empty"
	URLInvalid            = "url_invalid"
	URLScheme             = "url_scheme"
	IconURLInvalid        = "icon_url_invalid"
	IconDataURIInvalid    = "icon_data_uri_invalid"
	IconNotValid          = "icon_not_valid"
	IconEmpty             = "icon_empty"
	IconTooLarge          = "icon_too_large"          // params: maxKb
	IconUnsupportedFormat = "icon_unsupported_format" // params: mime

	// handlers_update.go
	UpdateDisabled    = "update_disabled"
	UpdateCheckFailed = "update_check_failed" // params: detail
	UpdateApplyFailed = "update_apply_failed" // params: detail

	// ws_terminal.go
	TerminalTooManySessions = "terminal_too_many_sessions"
	TerminalStartFailed     = "terminal_start_failed" // params: detail

	// SSE job errors (internal/fileexplorer.JobSnapshot, separate transport
	// from apiErrorBody — see FilesView.vue's job panel).
	JobFailed = "job_failed" // params: detail
)
