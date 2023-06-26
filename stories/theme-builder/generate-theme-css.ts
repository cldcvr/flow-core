export default function generateTheme(themeName: string, tokens: Record<string, string>) {
	const themeSCSS = `@function getHover($value) {
		$hover-color: lighten($value, 5%);
		@if lightness($value) > 50 {
			$hover-color: darken($value, 10%);
		}
		@return $hover-color;
	}
	@function getSelected($value) {
		$hover-color: lighten($value, 10%);
		@if lightness($value) > 50 {
			$hover-color: darken($value, 20%);
		}
		@return $hover-color;
	}
	
	[data-theme='${themeName}'] {
		$color-primary-secondary: ${tokens["--color-primary-secondary"]};
		--color-primary-secondary: #{$color-primary-secondary};
		--color-primary-secondary-hover: #{getHover($color-primary-secondary)};
		--color-primary-secondary-selected: #{getSelected($color-primary-secondary)};
		$color-primary-surface: ${tokens["--color-primary-surface"]};
		--color-primary-surface: #{$color-primary-surface};
		--color-primary-surface-hover: #{getHover($color-primary-surface)};
		--color-primary-surface-selected: #{getSelected($color-primary-surface)};
		$color-success-default: ${tokens["--color-success-default"]};
		--color-success-default: #{$color-success-default};
		--color-success-default-hover: #{getHover($color-success-default)};
		--color-success-default-selected: #{getSelected($color-success-default)};
		$color-primary-subtle: ${tokens["--color-primary-subtle"]};
		--color-primary-subtle: #{$color-primary-subtle};
		--color-primary-subtle-hover: #{getHover($color-primary-subtle)};
		--color-primary-subtle-selected: #{getSelected($color-primary-subtle)};
		$color-warning-text: ${tokens["--color-warning-text"]};
		--color-warning-text: #{$color-warning-text};
		--color-warning-text-hover: #{getHover($color-warning-text)};
		--color-warning-text-selected: #{getSelected($color-warning-text)};
		$color-success-subtle: ${tokens["--color-success-subtle"]};
		--color-success-subtle: #{$color-success-subtle};
		--color-success-subtle-hover: #{getHover($color-success-subtle)};
		--color-success-subtle-selected: #{getSelected($color-success-subtle)};
		$color-highlight-secondary: ${tokens["--color-highlight-secondary"]};
		--color-highlight-secondary: #{$color-highlight-secondary};
		--color-highlight-secondary-hover: #{getHover($color-highlight-secondary)};
		--color-highlight-secondary-selected: #{getSelected($color-highlight-secondary)};
		$color-success-secondary: ${tokens["--color-success-secondary"]};
		--color-success-secondary: #{$color-success-secondary};
		--color-success-secondary-hover: #{getHover($color-success-secondary)};
		--color-success-secondary-selected: #{getSelected($color-success-secondary)};
		$color-success-surface: ${tokens["--color-success-surface"]};
		--color-success-surface: #{$color-success-surface};
		--color-success-surface-hover: #{getHover($color-success-surface)};
		--color-success-surface-selected: #{getSelected($color-success-surface)};
		$color-highlight-default: ${tokens["--color-highlight-default"]};
		--color-highlight-default: #{$color-highlight-default};
		--color-highlight-default-hover: #{getHover($color-highlight-default)};
		--color-highlight-default-selected: #{getSelected($color-highlight-default)};
		$color-primary-text: ${tokens["--color-primary-text"]};
		--color-primary-text: #{$color-primary-text};
		--color-primary-text-hover: #{getHover($color-primary-text)};
		--color-primary-text-selected: #{getSelected($color-primary-text)};
		$color-highlight-text: ${tokens["--color-highlight-text"]};
		--color-highlight-text: #{$color-highlight-text};
		--color-highlight-text-hover: #{getHover($color-highlight-text)};
		--color-highlight-text-selected: #{getSelected($color-highlight-text)};
		$color-highlight-subtle: ${tokens["--color-highlight-subtle"]};
		--color-highlight-subtle: #{$color-highlight-subtle};
		--color-highlight-subtle-hover: #{getHover($color-highlight-subtle)};
		--color-highlight-subtle-selected: #{getSelected($color-highlight-subtle)};
		$color-danger-text: ${tokens["--color-danger-text"]};
		--color-danger-text: #{$color-danger-text};
		--color-danger-text-hover: #{getHover($color-danger-text)};
		--color-danger-text-selected: #{getSelected($color-danger-text)};
		$color-danger-subtle: ${tokens["--color-danger-subtle"]};
		--color-danger-subtle: #{$color-danger-subtle};
		--color-danger-subtle-hover: #{getHover($color-danger-subtle)};
		--color-danger-subtle-selected: #{getSelected($color-danger-subtle)};
		$color-danger-secondary: ${tokens["--color-danger-secondary"]};
		--color-danger-secondary: #{$color-danger-secondary};
		--color-danger-secondary-hover: #{getHover($color-danger-secondary)};
		--color-danger-secondary-selected: #{getSelected($color-danger-secondary)};
		$color-warning-secondary: ${tokens["--color-warning-secondary"]};
		--color-warning-secondary: #{$color-warning-secondary};
		--color-warning-secondary-hover: #{getHover($color-warning-secondary)};
		--color-warning-secondary-selected: #{getSelected($color-warning-secondary)};
		$color-warning-surface: ${tokens["--color-warning-surface"]};
		--color-warning-surface: #{$color-warning-surface};
		--color-warning-surface-hover: #{getHover($color-warning-surface)};
		--color-warning-surface-selected: #{getSelected($color-warning-surface)};
		$color-warning-default: ${tokens["--color-warning-default"]};
		--color-warning-default: #{$color-warning-default};
		--color-warning-default-hover: #{getHover($color-warning-default)};
		--color-warning-default-selected: #{getSelected($color-warning-default)};
		$color-warning-subtle: ${tokens["--color-warning-subtle"]};
		--color-warning-subtle: #{$color-warning-subtle};
		--color-warning-subtle-hover: #{getHover($color-warning-subtle)};
		--color-warning-subtle-selected: #{getSelected($color-warning-subtle)};
		$color-danger-surface: ${tokens["--color-danger-surface"]};
		--color-danger-surface: #{$color-danger-surface};
		--color-danger-surface-hover: #{getHover($color-danger-surface)};
		--color-danger-surface-selected: #{getSelected($color-danger-surface)};
		$color-danger-default: ${tokens["--color-danger-default"]};
		--color-danger-default: #{$color-danger-default};
		--color-danger-default-hover: #{getHover($color-danger-default)};
		--color-danger-default-selected: #{getSelected($color-danger-default)};
		$color-highlight-surface: ${tokens["--color-highlight-surface"]};
		--color-highlight-surface: #{$color-highlight-surface};
		--color-highlight-surface-hover: #{getHover($color-highlight-surface)};
		--color-highlight-surface-selected: #{getSelected($color-highlight-surface)};
		$color-primary-default: ${tokens["--color-primary-default"]};
		--color-primary-default: #{$color-primary-default};
		--color-primary-default-hover: #{getHover($color-primary-default)};
		--color-primary-default-selected: #{getSelected($color-primary-default)};
		$color-success-text: ${tokens["--color-success-text"]};
		--color-success-text: #{$color-success-text};
		--color-success-text-hover: #{getHover($color-success-text)};
		--color-success-text-selected: #{getSelected($color-success-text)};
		$color-hover: ${tokens["--color-hover"]};
		--color-hover: #{$color-hover};
		--color-hover-hover: #{getHover($color-hover)};
		--color-hover-selected: #{getSelected($color-hover)};
		$color-selected: ${tokens["--color-selected"]};
		--color-selected: #{$color-selected};
		--color-selected-hover: #{getHover($color-selected)};
		--color-selected-selected: #{getSelected($color-selected)};
		$color-icon-default: ${tokens["--color-icon-default"]};
		--color-icon-default: #{$color-icon-default};
		--color-icon-default-hover: #{getHover($color-icon-default)};
		--color-icon-default-selected: #{getSelected($color-icon-default)};
		$color-icon-secondary: ${tokens["--color-icon-secondary"]};
		--color-icon-secondary: #{$color-icon-secondary};
		--color-icon-secondary-hover: #{getHover($color-icon-secondary)};
		--color-icon-secondary-selected: #{getSelected($color-icon-secondary)};
		$color-text-subtle: ${tokens["--color-text-subtle"]};
		--color-text-subtle: #{$color-text-subtle};
		--color-text-subtle-hover: #{getHover($color-text-subtle)};
		--color-text-subtle-selected: #{getSelected($color-text-subtle)};
		$color-text-default: ${tokens["--color-text-default"]};
		--color-text-default: #{$color-text-default};
		--color-text-default-hover: #{getHover($color-text-default)};
		--color-text-default-selected: #{getSelected($color-text-default)};
		$color-icon-subtle: ${tokens["--color-icon-subtle"]};
		--color-icon-subtle: #{$color-icon-subtle};
		--color-icon-subtle-hover: #{getHover($color-icon-subtle)};
		--color-icon-subtle-selected: #{getSelected($color-icon-subtle)};
		$color-text-secondary: ${tokens["--color-text-secondary"]};
		--color-text-secondary: #{$color-text-secondary};
		--color-text-secondary-hover: #{getHover($color-text-secondary)};
		--color-text-secondary-selected: #{getSelected($color-text-secondary)};
		$color-neutral-subtle: ${tokens["--color-neutral-subtle"]};
		--color-neutral-subtle: #{$color-neutral-subtle};
		--color-neutral-subtle-hover: #{getHover($color-neutral-subtle)};
		--color-neutral-subtle-selected: #{getSelected($color-neutral-subtle)};
		$color-neutral-text: ${tokens["--color-neutral-text"]};
		--color-neutral-text: #{$color-neutral-text};
		--color-neutral-text-hover: #{getHover($color-neutral-text)};
		--color-neutral-text-selected: #{getSelected($color-neutral-text)};
		$color-neutral-default: ${tokens["--color-neutral-default"]};
		--color-neutral-default: #{$color-neutral-default};
		--color-neutral-default-hover: #{getHover($color-neutral-default)};
		--color-neutral-default-selected: #{getSelected($color-neutral-default)};
		$color-surface-subtle: ${tokens["--color-surface-subtle"]};
		--color-surface-subtle: #{$color-surface-subtle};
		--color-surface-subtle-hover: #{getHover($color-surface-subtle)};
		--color-surface-subtle-selected: #{getSelected($color-surface-subtle)};
		$color-surface-tertiary: ${tokens["--color-surface-tertiary"]};
		--color-surface-tertiary: #{$color-surface-tertiary};
		--color-surface-tertiary-hover: #{getHover($color-surface-tertiary)};
		--color-surface-tertiary-selected: #{getSelected($color-surface-tertiary)};
		$color-neutral-surface: ${tokens["--color-neutral-surface"]};
		--color-neutral-surface: #{$color-neutral-surface};
		--color-neutral-surface-hover: #{getHover($color-neutral-surface)};
		--color-neutral-surface-selected: #{getSelected($color-neutral-surface)};
		$color-neutral-secondary: ${tokens["--color-neutral-secondary"]};
		--color-neutral-secondary: #{$color-neutral-secondary};
		--color-neutral-secondary-hover: #{getHover($color-neutral-secondary)};
		--color-neutral-secondary-selected: #{getSelected($color-neutral-secondary)};
		$color-surface-secondary: ${tokens["--color-surface-secondary"]};
		--color-surface-secondary: #{$color-surface-secondary};
		--color-surface-secondary-hover: #{getHover($color-surface-secondary)};
		--color-surface-secondary-selected: #{getSelected($color-surface-secondary)};
		$color-surface-default: ${tokens["--color-surface-default"]};
		--color-surface-default: #{$color-surface-default};
		--color-surface-default-hover: #{getHover($color-surface-default)};
		--color-surface-default-selected: #{getSelected($color-surface-default)};
		$color-border-subtle: ${tokens["--color-border-subtle"]};
		--color-border-subtle: #{$color-border-subtle};
		--color-border-subtle-hover: #{getHover($color-border-subtle)};
		--color-border-subtle-selected: #{getSelected($color-border-subtle)};
		$color-border-secondary: ${tokens["--color-border-secondary"]};
		--color-border-secondary: #{$color-border-secondary};
		--color-border-secondary-hover: #{getHover($color-border-secondary)};
		--color-border-secondary-selected: #{getSelected($color-border-secondary)};
		$color-border-default: ${tokens["--color-border-default"]};
		--color-border-default: #{$color-border-default};
		--color-border-default-hover: #{getHover($color-border-default)};
		--color-border-default-selected: #{getSelected($color-border-default)};
	}`;

	download(`${themeName}.scss`, themeSCSS);
}

function download(filename: string, text: string) {
	const element = document.createElement("a");
	element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
	element.setAttribute("download", filename);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}