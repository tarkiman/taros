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

	// handlers_users.go
	UsernameRequired      = "username_required"
	UsernameAlreadyExists = "username_already_exists"
	PasswordTooShort      = "password_too_short" // params: min
	UserNotFound          = "user_not_found"
	CannotRemoveLastUser  = "cannot_remove_last_user"
	CannotRemoveSelf      = "cannot_remove_self"
	UsersSaveFailed       = "users_save_failed" // params: detail
	PasswordTooLong       = "password_too_long" // params: max
	PasswordSameAsOld     = "password_same_as_old"
	PasswordSaveFailed    = "password_save_failed" // params: detail

	// handlers_files.go
	PathInvalid          = "path_invalid"          // params: detail
	DirectoryReadFailed  = "directory_read_failed" // params: detail
	UnknownAction        = "unknown_action"        // params: action
	FileOpFailed         = "file_op_failed"        // params: detail
	FileExists           = "file_exists"           // the name is already taken
	FileNameInvalid      = "file_name_invalid"     // not a valid name for one entry
	FileNotFound         = "file_not_found"
	FilePermissionDenied = "file_permission_denied"
	FileReadOnly         = "file_read_only" // read-only filesystem (e.g. a dirty USB volume)
	FileNoSpace          = "file_no_space"
	NoItemsSelected      = "no_items_selected"
	ClipboardEmpty       = "clipboard_empty"
	PasteFailed          = "paste_failed"  // params: detail
	UploadFailed         = "upload_failed" // params: detail
	NoFileUploaded       = "no_file_uploaded"
	UploadWriteFailed    = "upload_write_failed" // params: detail

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
	DockerUnreachable           = "docker_unreachable"              // params: detail
	DockerContainerActionFailed = "docker_container_action_failed"  // params: action, detail
	DockerImageRemoveFailed     = "docker_image_remove_failed"      // params: detail
	DockerVolumeRemoveFailed    = "docker_volume_remove_failed"     // params: detail
	DockerNetworkRemoveFailed   = "docker_network_remove_failed"    // params: detail
	DockerPruneFailed           = "docker_prune_failed"             // params: kind, detail
	DockerLogsFailed            = "docker_logs_failed"              // params: detail
	DockerEnvFailed             = "docker_env_failed"               // params: detail
	DockerProjectNotFound       = "docker_project_not_found"        // no container/network/volume carries the compose label
	DockerProjectRunsThis       = "docker_project_runs_this"        // TarOS itself is a container of that project
	DockerProjectUninstallFail  = "docker_project_uninstall_failed" // params: detail
	DockerProjectConfirmMissing = "docker_project_confirm_missing"  // typed app name didn't match
	DockerProjectActionInvalid  = "docker_project_action_invalid"   // not start|stop|restart
	DockerProjectBusy           = "docker_project_busy"             // another action is already running on it

	// ws_container_shell.go / handlers_settings.go — sent as {"type":"error","code":…}
	// frames on the WebSocket (a failed handshake's body never reaches the browser)
	ContainerShellToggleFailed = "container_shell_toggle_failed"  // params: detail
	ShellTooManySessions       = "docker_shell_too_many_sessions" // params: max
	ShellNotRunning            = "docker_shell_not_running"
	ShellNotFound              = "docker_shell_not_found"
	ShellNoShell               = "docker_shell_no_shell"
	ShellStartFailed           = "docker_shell_start_failed" // params: detail
	ShellIdleTimeout           = "docker_shell_idle_timeout" // params: minutes

	// handlers_sharing.go / internal/sharing
	SharingUnavailable      = "sharing_unavailable"   // not Linux / not wired
	SharingCannotManage     = "sharing_cannot_manage" // params: reason
	SharingNotManaged       = "sharing_not_managed"
	SharingAccountInvalid   = "sharing_account_invalid"
	SharingAccountExists    = "sharing_account_exists"
	SharingAccountMissing   = "sharing_account_missing"
	SharingAccountInUse     = "sharing_account_in_use" // params: share
	SharingPasswordWeak     = "sharing_password_weak"  // params: min
	SharingPasswordInvalid  = "sharing_password_invalid"
	SharingShareInvalid     = "sharing_share_invalid"
	SharingShareExists      = "sharing_share_exists"
	SharingShareMissing     = "sharing_share_missing"
	SharingShareNoAccess    = "sharing_share_no_access"
	SharingShareUser        = "sharing_share_user"
	SharingShareMode        = "sharing_share_mode"
	SharingShareNameForeign = "sharing_share_name_foreign"
	SharingCommentInvalid   = "sharing_comment_invalid"
	SharingPathInvalid      = "sharing_path_invalid"
	SharingPathDenied       = "sharing_path_denied"
	SharingPathOutside      = "sharing_path_outside"
	SharingOwnedByRoot      = "sharing_owned_by_root"
	SharingRunAsInvalid     = "sharing_run_as_invalid"
	SharingInterfaceInvalid = "sharing_interface_invalid"
	SharingApplyRejected    = "sharing_apply_rejected" // params: detail
	SharingServiceAction    = "sharing_service_action"
	SharingNoSystemd        = "sharing_no_systemd"
	SharingNoUserBackend    = "sharing_no_user_backend"
	SharingFailed           = "sharing_failed" // params: detail
	SharingFTPNotManaged    = "sharing_ftp_not_managed"
	SharingFTPSettings      = "sharing_ftp_settings"
	SharingFTPNoAccounts    = "sharing_ftp_no_accounts"
	SharingFTPApplyRejected = "sharing_ftp_apply_rejected" // params: detail
	SharingNoLogin          = "sharing_no_login"

	// handlers_storage.go / internal/storage
	StorageUnavailable     = "storage_unavailable"
	StorageCannotMount     = "storage_cannot_mount" // params: reason
	StorageNoDevice        = "storage_no_device"
	StorageManagedByFstab  = "storage_managed_by_fstab"
	StorageUnsupportedFS   = "storage_unsupported_fs"
	StorageAlreadyMounted  = "storage_already_mounted"
	StorageNotMounted      = "storage_not_mounted"
	StorageMountpointInUse = "storage_mountpoint_in_use"
	StorageMountFailed     = "storage_mount_failed"   // params: detail
	StorageUnmountFailed   = "storage_unmount_failed" // params: detail
	StorageBusy            = "storage_busy"           // params: users
	StorageFailed          = "storage_failed"         // params: detail

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

	// handlers_notify.go / internal/notify
	NotifyWebhookRequired = "notify_webhook_required"
	NotifyWebhookInvalid  = "notify_webhook_invalid"
	NotifyThresholdRange  = "notify_threshold_range" // params: min, max
	NotifyDurationRange   = "notify_duration_range"  // params: min, max
	NotifySaveFailed      = "notify_save_failed"     // params: detail
	NotifyTestFailed      = "notify_test_failed"     // params: detail

	// handlers_foldershortcuts.go / internal/foldershortcuts
	FolderShortcutNotFound      = "folder_shortcut_not_found"
	FolderShortcutPathInvalid   = "folder_shortcut_path_invalid" // params: detail
	FolderShortcutPathRequired  = "folder_shortcut_path_required"
	FolderShortcutDuplicatePath = "folder_shortcut_duplicate_path"
	FolderShortcutNoDestination = "folder_shortcut_no_destination"
	FolderShortcutLabelTooLong  = "folder_shortcut_label_too_long" // params: max
	MaxFolderShortcutsReached   = "max_folder_shortcuts_reached"   // params: max
	FolderShortcutsSaveFailed   = "folder_shortcuts_save_failed"   // params: detail

	// SSE job errors (internal/fileexplorer.JobSnapshot, separate transport
	// from apiErrorBody — see FilesView.vue's job panel).
	JobFailed = "job_failed" // params: detail

	DiskAnalysisScanFailed   = "disk_analysis_scan_failed"   // params: detail
	DiskAnalysisScanBusy     = "disk_analysis_scan_busy"     // a scan is already running
	DiskAnalysisScanTimeout  = "disk_analysis_scan_timeout"  // scan exceeded diskAnalysis.timeoutSec
	DiskAnalysisToggleFailed = "disk_analysis_toggle_failed" // params: detail

	// handlers_system.go
	NetInfoFailed = "net_info_failed" // params: detail

	// handlers_appmeta.go / internal/appmeta (URL/icon errors reuse the
	// quicklinks ones: URLInvalid, URLScheme, Icon*)
	AppNameInvalid    = "app_name_invalid"     // params: max
	MaxAppsReached    = "max_apps_reached"     // params: max
	AppMetaSaveFailed = "app_meta_save_failed" // params: detail

	// handlers_wifi.go / internal/wifi
	WifiUnavailable         = "wifi_unavailable" // params: reason
	WifiBusy                = "wifi_busy"        // a switch is already in progress
	WifiSSIDInvalid         = "wifi_ssid_invalid"
	WifiPasswordInvalid     = "wifi_password_invalid" // not a valid WPA passphrase
	WifiPasswordRequired    = "wifi_password_required"
	WifiSecurityUnsupported = "wifi_security_unsupported" // enterprise / WEP
	WifiForgetActive        = "wifi_forget_active"
	WifiNotFound            = "wifi_not_found"
	WifiScanFailed          = "wifi_scan_failed" // params: detail
	WifiFailed              = "wifi_failed"      // params: detail
)
