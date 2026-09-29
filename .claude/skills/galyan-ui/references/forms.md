# Form & Input Components
Buttons, text fields, choice controls, pickers (date/month/time/color), file upload and drag-and-drop from `@galyan/ui`.

## Button
Themed action button with variants, sizes, loading state, icons and polymorphic `as`.
Import: `import { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "@galyan/ui";`

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`; ref forwarded (`HTMLButtonElement`).

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `ButtonVariant` (`"primary" \| "secondary" \| "tertiary" \| "success" \| "warning" \| "danger" \| "danger-soft" \| "soft" \| "link" \| "ghost" \| "solid" \| "outline" \| "glassmorphic" \| "glass"`) | `"primary"` | Visual style |
| size | `ButtonSize` (`"xs" \| "sm" \| "md" \| "lg" \| "xl"`) | `"md"` | Size preset |
| isLoading | `boolean` | `false` | Shows spinner, disables button |
| loadingText | `string` | - | Text next to spinner (replaces children while loading) |
| fullWidth | `boolean` | `false` | Stretch to parent width |
| outline | `boolean` | `false` | Outlined version of the variant |
| leftIcon | `ReactNode` | - | Icon before children |
| rightIcon | `ReactNode` | - | Icon after children |
| onClick | `(event: React.MouseEvent<HTMLButtonElement>) => void` | - | Click handler |
| themeRole | `ThemeRole` (from `@galyan/theme`) | - | Sets `data-theme` on the button |
| colorMode | `ColorMode` (from `@galyan/theme`) | - | Sets `data-color-mode` (light/dark) |
| className | `string` | `""` | Extra classes |
| as | `React.ElementType` | `"button"` | Polymorphic element tag |
| href | `string` | - | Passed through (use with `as="a"`) |

```tsx
<Button variant="primary" leftIcon={<PlusIcon />} onClick={save}>Save</Button>
<Button variant="secondary" isLoading loadingText="Saving...">Save</Button>
<Button as="a" href="/docs" variant="link">Docs</Button>
<Button variant="ghost" leftIcon={<TrashIcon />} aria-label="Delete" /> {/* icon-only */}
```
Notes: `disabled` or `isLoading` suppress `onClick`. Icon-only styling applies automatically when there are no children and an icon is given; add `aria-label`. `type` is not defaulted, so inside a `<form>` it acts as submit unless you pass `type="button"`.

## ClearButton
Small "x" button for clearing a field (used internally by Input, Dropdown, pickers).
Import: `import { ClearButton, type ClearButtonProps, type ClearButtonSize, type ClearButtonVariant } from "@galyan/ui";`

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`; ref forwarded.

| Prop | Type | Default | Description |
|---|---|---|---|
| size | `ClearButtonSize` (`"xs" \| "sm" \| "md"`) | `"sm"` | Size |
| variant | `ClearButtonVariant` (`"subtle" \| "filled"`) | `"subtle"` | Style |
| ariaLabel | `string` | `"Clear"` | Accessible label |
| className | `string` | `""` | Extra classes |
| type (native) | - | `"button"` | Defaults to `"button"` |

```tsx
<ClearButton size="sm" onClick={() => setValue("")} ariaLabel="Clear search" />
```
Notes: click calls `stopPropagation()` before `onClick`, so it is safe inside clickable triggers.

## Input
Text input with label, helper/error/success messaging, icons and clear button.
Import: `import { Input, type InputProps, type InputSize } from "@galyan/ui";` (`InputVariant` is not re-exported)

Extends `Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">`; ref forwarded to the `<input>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| label | `string` | - | Label above the input |
| placeholder | `string` | - | Placeholder |
| helperText | `string` | - | Text below; shown as error text when in error state |
| helperIcon | `ReactNode` | - | Override the helper icon |
| size | `InputSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size |
| fullWidth | `boolean` | `true` | Full container width (false = inline) |
| variant | `"default" \| "filled" \| "focused" \| "error" \| "success" \| "disabled"` | `"default"` | Visual variant |
| type | `string` | `"text"` | Input type |
| required | `boolean` | - | Required marker + native required |
| hasError | `boolean` | - | Error state |
| hasSuccess | `boolean` | - | Success state |
| isDisabled | `boolean` | - | Disabled (native `disabled` also works) |
| isFocused | `boolean` | - | Force focused styling |
| leftIcon | `ReactNode` | - | Left addon icon |
| rightIcon | `ReactNode` | - | Right addon icon (hidden while clear button shows) |
| onLeftIconClick | `() => void` | - | Makes left icon clickable |
| onRightIconClick | `() => void` | - | Makes right icon clickable (e.g. password toggle) |
| className | `string` | `""` | Root class |
| clearable | `boolean` | - | Show clear button when `value` is truthy |
| onClear | `() => void` | - | Clear button handler |
| disableBorderEffects | `boolean` | `false` | Disable focus ring/color change |
| borderRadius | `string` | - | CSS border radius |
| error | `string` | - | Legacy: error message (implies error state) |

```tsx
const [email, setEmail] = useState("");
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  clearable
  onClear={() => setEmail("")}
  hasError={!valid}
  helperText={valid ? "We'll never share it" : "Enter a valid email"}
  required
/>
```
Notes: `onChange` is the native event handler. `clearable` only works with a controlled `value`; you must reset the value yourself in `onClear`.

### InputGroup
Wraps a control (usually `Input`) with left/right addons (text, `Button`, or `Dropdown`).
Import: `import { InputGroup, type InputGroupProps, type InputGroupVariant } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| children **(required)** | `ReactNode` | - | The control(s) |
| leftAddon | `ReactNode` | - | Left addon |
| rightAddon | `ReactNode` | - | Right addon |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `InputGroupVariant` (`"default" \| "filled" \| "glassmorphic" \| "glass"`) | `"default"` | Style |
| fullWidth | `boolean` | `true` | Full width |
| label | `ReactNode` | - | Label |
| helperText | `string` | - | Helper/error text |
| hasError | `boolean` | `false` | Error state |
| disabled | `boolean` | `false` | Disabled |
| required | `boolean` | `false` | Required marker |
| className | `string` | `""` | Root class |

Not ref-forwarding. Injects `variant`/`size`/`disabled`/`hasError` into children and dropdown addons unless they set them (glass variants map to `"default"` on children).

### DropdownGroup
InputGroup with a `Dropdown` addon on one side (e.g. phone country code). Also re-exported from the dropdown module.
Import: `import { DropdownGroup, type DropdownGroupProps } from "@galyan/ui";`

All `InputGroupProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| dropdown **(required)** | `ReactNode` | - | The `Dropdown` element |
| dropdownPosition | `"left" \| "right"` | `"left"` | Side for the dropdown |
| leftAddon / rightAddon | `ReactNode` | - | Addon for the opposite side |

```tsx
<InputGroup leftAddon="https://" rightAddon=".com">
  <Input placeholder="my-domain" />
</InputGroup>

<DropdownGroup
  label="Phone Number"
  dropdownPosition="left"
  dropdown={<Dropdown options={[{ value: "+1", label: "+1" }, { value: "+44", label: "+44" }]} value={code} onChange={setCode} />}
>
  <Input placeholder="555 000 1234" value={phone} onChange={(e) => setPhone(e.target.value)} />
</DropdownGroup>
```

## Textarea
Multi-line text field with label, helper states, character counter and auto-resize.
Import: `import { Textarea, type TextareaProps, type TextareaSize, type TextareaVariant } from "@galyan/ui";`

Extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>`; ref forwarded.

| Prop | Type | Default | Description |
|---|---|---|---|
| label | `string` | - | Label |
| helperText | `string` | - | Helper text (error text in error state) |
| helperIcon | `ReactNode` | - | Override helper icon |
| size | `TextareaSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size |
| fullWidth | `boolean` | `true` | Full width |
| variant | `TextareaVariant` (`"default" \| "filled" \| "focused" \| "error" \| "success" \| "disabled"`) | `"default"` | Variant |
| hasError | `boolean` | - | Error state |
| hasSuccess | `boolean` | - | Success state |
| isDisabled | `boolean` | - | Disabled (native `disabled` also works) |
| isFocused | `boolean` | - | Force focused styling |
| required | `boolean` | - | Required |
| maxCharCount | `number` | - | Shows `count/max` counter (does not block typing) |
| autoResize | `boolean` | `false` | Grow height with content |
| resize | `"none" \| "vertical" \| "horizontal" \| "both"` | - | CSS resize (ignored when `autoResize`) |
| disableBorderEffects | `boolean` | `false` | Disable focus effects |
| borderRadius | `string` | - | CSS border radius |
| error | `string` | - | Legacy error message |

```tsx
<Textarea label="Description" value={text} onChange={(e) => setText(e.target.value)} maxCharCount={200} autoResize />
```
Notes: the counter reads `value`, so it only counts in controlled mode. Use `maxLength` (native) to actually enforce a limit.

## Checkbox
Checkbox with label, description and indeterminate state.
Import: `import { Checkbox, type CheckboxProps } from "@galyan/ui";`

Extends `Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">`; ref forwarded to the `<input>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| color | `"primary" \| "error"` | `"primary"` | Color theme |
| variant | `"solid" \| "outline" \| "soft"` | `"solid"` | Style |
| label | `ReactNode` | - | Label |
| description | `ReactNode` | - | Secondary text under label |
| indeterminate | `boolean` | `false` | Indeterminate (dash) state |
| isDisabled | `boolean` | `false` | Disabled |
| className | `string` | `""` | Wrapper class |

```tsx
<Checkbox label="Accept terms" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
<Checkbox label="Select all" checked={all} indeterminate={some && !all} onChange={toggleAll} />
```
Notes: native `onChange` event; use `checked` (controlled) or `defaultChecked`.

## RadioGroup
Group of radio buttons driven by an `options` array.
Import: `import { RadioGroup, type RadioGroupProps, type RadioOption, type RadioSize } from "@galyan/ui";`

Not ref-forwarding; no native attribute spread.

| Prop | Type | Default | Description |
|---|---|---|---|
| options **(required)** | `RadioOption[]` | - | `{ value: string; label: ReactNode; disabled?: boolean }` |
| name | `string` | auto (`useId`) | Input name |
| value | `string` | - | Controlled value |
| defaultValue | `string` | - | Uncontrolled initial value |
| onChange | `(value: string) => void` | - | Receives the option value |
| size | `RadioSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size |
| orientation | `"horizontal" \| "vertical"` | `"vertical"` | Layout |
| label | `string` | - | Group label |
| helperText | `string` | - | Helper/error text |
| hasError | `boolean` | `false` | Error state |
| isDisabled | `boolean` | `false` | Disable all options |
| isRequired | `boolean` | `false` | Required |
| className | `string` | `""` | Root class |

```tsx
<RadioGroup
  label="Plan"
  orientation="horizontal"
  options={[{ value: "free", label: "Free" }, { value: "pro", label: "Pro" }]}
  value={plan}
  onChange={setPlan}
/>
```

## Toggle
On/off switch (checkbox with `role="switch"`).
Import: `import { Toggle, type ToggleProps } from "@galyan/ui";`

Extends `Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">`; ref forwarded.

| Prop | Type | Default | Description |
|---|---|---|---|
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| label | `ReactNode` | - | Label |
| withIcon | `boolean` | `false` | Show tick/cross icons in track |
| icon | `{ on: ReactNode; off: ReactNode }` | - | Custom icons (needs `withIcon`) |
| isDisabled | `boolean` | `false` | Disabled |
| className | `string` | `""` | Wrapper class |

```tsx
<Toggle label="Notifications" checked={on} onChange={(e) => setOn(e.target.checked)} withIcon />
```

## Dropdown
Select menu with single/multi selection, search, groups, tags and custom rendering (floating-ui, portal by default).
Import: `import { Dropdown, DropdownGroup, type DropdownProps, type DropdownOption, type DropdownGroupProps } from "@galyan/ui";`

Not ref-forwarding; no native attribute spread.

| Prop | Type | Default | Description |
|---|---|---|---|
| options **(required)** | `DropdownOption[]` | - | See below |
| id | `string` | auto | Trigger id |
| value | `string \| string[]` | - | Selected value(s) |
| onChange | `(val: any) => void` | - | `string` (single) or `string[]` (multiple) |
| placeholder | `string` | `"Select option"` | Placeholder |
| label | `string` | - | Label |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `"default" \| "filled" \| "glassmorphic" \| "glass"` | `"default"` | Style |
| multiple | `boolean` | `false` | Multi-select with checkboxes and tags |
| searchable | `boolean` | `false` | Search box in menu |
| searchPlaceholder | `string` | `"Search..."` | Search placeholder |
| clearable | `boolean` | `false` | Clear button |
| disabled | `boolean` | `false` | Disabled |
| loading | `boolean` | `false` | Loading spinner; blocks selection |
| required | `boolean` | `false` | Required marker |
| leftIcon / rightIcon | `ReactNode` | - | Trigger icons |
| onOpen / onClose | `() => void` | - | Menu open/close callbacks |
| error | `string` | - | Error message (implies error state) |
| errorMessage | `string` | - | Alias of `error` |
| hasError | `boolean` | `false` | Error state |
| hasSuccess | `boolean` | `false` | Success state |
| helperText | `string` | - | Helper text |
| className | `string` | `""` | Root class |
| onSearch | `(query: string) => void` | - | Search input callback (e.g. async fetch) |
| filterOption | `(option: DropdownOption, query: string) => boolean` | - | Custom filter (default: label includes query) |
| renderOption | `(option: DropdownOption) => ReactNode` | - | Custom option content |
| renderValue | `(value: string \| string[]) => ReactNode` | - | Custom trigger content |
| renderDropdown | `(options: DropdownOption[]) => ReactNode` | - | Replace the whole menu body |
| maxTagCount | `number` | - | Max visible tags in multi mode (+N) |
| placement | `"top" \| "bottom"` | `"bottom"` | Menu side |
| align | `"left" \| "right"` | `"left"` | Menu alignment |
| smartPosition | `boolean` | `true` | Auto flip top/bottom |
| dropdownWidth | `string \| number` | trigger width | Menu width |
| customWidth | `string \| number` | - | Alias for `dropdownWidth` (takes priority) |
| showSelectAll | `boolean` | `false` | "Select all" row (multi) |
| groupBy | `string` | - | Option key to group by (default uses `option.group`) |
| zIndex | `number` | `10050` | Menu z-index |
| expandedMenu | `boolean` | `false` | Always-open inline menu |
| usePortal | `boolean` | `true` | Render menu in a portal |
| showOptionTooltips | `boolean` | `true` | Tooltip on truncated option labels |

`DropdownOption`: `{ value: string; label: ReactNode; description?: ReactNode; disabled?: boolean; group?: string; icon?: ReactNode; [key: string]: any }`

```tsx
const [country, setCountry] = useState("");
<Dropdown
  label="Country"
  options={[{ value: "in", label: "India" }, { value: "us", label: "United States" }]}
  value={country}
  onChange={setCountry}
  searchable
  clearable
/>

const [tags, setTags] = useState<string[]>([]);
<Dropdown multiple showSelectAll maxTagCount={2} options={opts} value={tags} onChange={setTags} />
```
Notes: fully controlled; there is no internal selection state, so you must pass `value` and update it in `onChange`. Clearing emits `""` (single) or `[]` (multiple). Default search matches `String(label)`, so pass `filterOption` when labels are ReactNodes.

## DatePicker
Input-triggered popover for a single date, a date range, or date plus time, with presets and several output formats.
Import: `import { DatePicker, formatDateWithTokens, parseDateValue, type DatePickerProps, type DatePickerValue, type DatePickerSingleValue, type DatePickerRangeValue, type DatePickerPreset, type DatePickerChangeContext } from "@galyan/ui";`

Not ref-forwarding; no native attribute spread.

| Prop | Type | Default | Description |
|---|---|---|---|
| mode | `"single" \| "range" \| "datetime"` | `"single"` | Selection mode |
| showTime | `boolean` | `false` | Enable time selection (same as `mode="datetime"`) |
| enableTime | `boolean` | `false` | Alias for `showTime` |
| timeFormat | `"12h" \| "24h"` | auto (`24h` if `dateFormat` has `HH`, else `12h`) | Time format |
| showSeconds | `boolean` | auto (true if `dateFormat` has `ss`) | Seconds selector |
| minuteStep | `number` | `1` | Minute step |
| secondStep | `number` | `1` | Second step |
| hourStep | `number` | `1` | Hour step |
| placeholder | `string` | mode-based | Placeholder |
| variant | `"default" \| "filled" \| "focused" \| "error" \| "success" \| "disabled" \| "glassmorphic" \| "glass" \| "range"` | `"default"` | Style (`"range"` also turns on range mode) |
| value | `DatePickerValue` | - | Controlled value |
| defaultValue | `DatePickerValue` | - | Uncontrolled initial value |
| valueFormat | `"date" \| "epoch" \| "iso" \| "string"` | `"date"` | Shape of value passed to `onChange`/`onApply` |
| onChange | `(val: any, context?: DatePickerChangeContext) => void` | - | Value change |
| leftIcon / rightIcon | `ReactNode` | - | Trigger icons |
| minDate / maxDate | `Date \| number \| string` | - | Selectable bounds |
| onOpen / onClose / onCancel | `() => void` | - | Popover lifecycle |
| onApply | `(val: any, context?: DatePickerChangeContext) => void` | - | Apply button |
| onClear | `() => void` | - | Clear |
| dateFormat | `string` | `"YYYY-MM-DD"` (datetime: `"YYYY-MM-DD hh:mm A"` etc.) | Tokens `YYYY YY MMMM MMM MM M DD D HH H hh h mm m ss s A a`, or `"epoch"` / `"iso"` |
| firstDayOfWeek | `0 \| 1` | `0` | Sunday / Monday |
| placement | `"top" \| "bottom"` | `"bottom"` | Popover side |
| align | `"left" \| "right"` | `"left"` | Popover alignment |
| smartPosition | `boolean` | `true` | Auto flip |
| zIndex | `number` | `10050` | Popover z-index |
| usePortal | `boolean` | `true` | Portal |
| disableFutureDates | `boolean` | `false` | Sets max date to today |
| required | `boolean` | `false` | Required |
| disabled | `boolean` | `false` | Disabled |
| label | `string` | - | Label |
| helperText | `string` | - | Helper text |
| hasError | `boolean` | `false` | Error state |
| showActions | `boolean` | `true` | Footer with Cancel/Apply |
| showPresent | `boolean` | `true` | "Present"/"Today" button (range end can be `"present"`) |
| showClear | `boolean` | `true` | Clear button in popover |
| clearable | `boolean` | `true` | Clear icon in trigger |
| defaultTimeDropdownOpen | `boolean` | `false` | Time dropdown open by default (datetime) |
| showEpoch | `boolean` | `false` | Epoch badge in popover |
| presets | `DatePickerPreset[]` | - | `{ label: string; getValue: () => DatePickerValue }` quick picks |
| className | `string` | `""` | Root class |

Types:
- `DatePickerSingleValue = Date | number | string | null`
- `DatePickerRangeValue = [Date | number | string | null, Date | number | string | "present" | null] | null`
- `DatePickerChangeContext = { date; epoch; formatted: string }` (always gives a Date, epoch ms and formatted string)
- `parseDateValue(val): Date | null` accepts Date, epoch (seconds or ms) or date string. `formatDateWithTokens(date, format): string`.

```tsx
const [date, setDate] = useState<DatePickerValue>(new Date());
<DatePicker label="Start date" value={date} onChange={setDate} />

const [range, setRange] = useState<DatePickerRangeValue>([new Date(2026, 6, 10), new Date(2026, 6, 20)]);
<DatePicker mode="range" value={range} onChange={setRange} />

<DatePicker mode="datetime" timeFormat="24h" valueFormat="epoch" onChange={(ms, ctx) => save(ms, ctx?.formatted)} />
```
Notes: input accepts Date, epoch number or string, but output follows `valueFormat` (a Date object by default). With `showActions` (the default) or an `onApply` handler, `onChange` fires only when Apply is clicked; with `showActions={false}` and no `onApply`, it fires on each pick. The trigger clear icon always fires `onChange(null, ...)`.

### MonthPicker
Input-triggered month/year selector.
Import: `import { MonthPicker, type MonthPickerProps } from "@galyan/ui";` (value type is `MonthCalendarValue`)

| Prop | Type | Default | Description |
|---|---|---|---|
| placeholder | `string` | `"Select month"` | Placeholder |
| value | `MonthCalendarValue \| null` | - | Controlled `{ year, month }` (month 0-11) |
| defaultValue | `MonthCalendarValue \| null` | - | Uncontrolled initial |
| onChange | `(val: MonthCalendarValue \| null) => void` | - | Change (null on clear) |
| minYear / maxYear | `number` | `1970` / `2050` | Year bounds |
| minMonth / maxMonth | `MonthCalendarValue` | - | Month bounds |
| minDate / maxDate | `Date` | - | Date bounds |
| onOpen / onClose / onCancel | `() => void` | - | Lifecycle |
| onApply | `(val: MonthCalendarValue \| null) => void` | - | If set, selection waits for Apply |
| onClear | `() => void` | - | Clear |
| clearable | `boolean` | `true` | Trigger clear icon |
| placement | `"top" \| "bottom"` | `"bottom"` | Popover side |
| align | `"left" \| "right"` | `"left"` | Alignment |
| smartPosition | `boolean` | `true` | Auto flip |
| zIndex | `number` | `10050` | z-index |
| usePortal | `boolean` | `true` | Portal |
| required | `boolean` | `false` | Required |
| disabled | `boolean` | `false` | Disabled |
| borderless | `boolean` | `false` | Borderless style |
| inline | `boolean` | `false` | Render calendar inline (no trigger/popover) |
| variant | `"default" \| "bordered" \| "glassmorphic" \| "glass" \| "borderless"` | `"default"` | Style |
| label | `string` | - | Label |
| helperText | `string` | - | Helper text |
| hasError | `boolean` | `false` | Error |
| className | `string` | `""` | Root class |
| size | `"sm" \| "md" \| "lg"` | - | Trigger size |
| menuSize | `"sm" \| "md" \| "lg"` | - | Popover menu size |

```tsx
const [month, setMonth] = useState<MonthCalendarValue | null>({ year: 2026, month: 8 });
<MonthPicker label="Billing month" value={month} onChange={setMonth} />
```
Notes: without `onApply`, picking a month commits and closes right away.

## Calendar
Inline date grid for a single date or a range, with day/month/year views.
Import: `import { Calendar, type CalendarProps, type CalendarValue } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" \| "bordered" \| "glassmorphic" \| "glass"` | `"default"` | Style |
| mode | `"single" \| "range"` | `"single"` | Selection mode |
| value | `CalendarValue` (`Date \| [Date, Date \| undefined]`) | - | Selected value |
| onChange | `(date: CalendarValue) => void` | - | Change |
| minDate / maxDate | `Date` | - | Bounds |
| firstDayOfWeek | `0 \| 1` | `0` | Sunday / Monday |
| showTodayButton | `boolean` | `false` | "Today" button |
| className | `string` | `""` | Class |
| style | `CSSProperties` | - | Inline style |

```tsx
const [range, setRange] = useState<CalendarValue>([new Date(), undefined]);
<Calendar mode="range" value={range} onChange={setRange} showTodayButton />
```
Notes: controlled only; the selection comes from `value`. In range mode the first click emits `[start, undefined]` and the second emits `[start, end]`. Only accepts `Date` objects (unlike DatePicker).

### MonthCalendar
Inline month/year grid.
Import: `import { MonthCalendar, type MonthCalendarProps, type MonthCalendarValue } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" \| "bordered" \| "glassmorphic" \| "glass" \| "borderless"` | `"default"` | Style |
| size | `"sm" \| "md" \| "lg"` | - | Size |
| borderless | `boolean` | `false` | No border/transparent bg |
| value | `MonthCalendarValue \| Date \| null` | - | Selected month |
| onChange | `(val: MonthCalendarValue) => void` | - | Change |
| minYear / maxYear | `number` | `1970` / `2050` | Year bounds |
| minMonth / maxMonth | `MonthCalendarValue` | - | Month bounds |
| minDate / maxDate | `Date` | - | Date bounds |
| defaultView | `"months" \| "years"` | `"months"` | Initial view |
| showTodayButton | `boolean` | `false` | "This Month" button |
| className | `string` | `""` | Class |
| style | `CSSProperties` | - | Inline style |

`MonthCalendarValue = { year: number; month: number }` where month is 0-11.

## TimePicker
Input-triggered time selector with scroll columns, presets and 12h/24h formats.
Import: `import { TimePicker, type TimePickerProps, type TimeValue, type TimeFormat, type TimePickerSize, type TimePickerVariant, type TimePickerPreset } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| value | `string \| Date \| TimeValue \| null` | - | Controlled (e.g. `"09:30 AM"`) |
| defaultValue | `string \| Date \| TimeValue \| null` | - | Uncontrolled initial |
| onChange | `(formatted: string, value: TimeValue) => void` | - | Formatted string + parts |
| format | `TimeFormat` (`"12h" \| "24h"`) | `"12h"` | Format |
| showSeconds | `boolean` | `false` | Seconds column |
| minuteStep / secondStep / hourStep | `number` | `1` | Step intervals |
| placeholder | `string` | `"hh:mm aa"` / `"HH:mm"` | Placeholder |
| label | `string` | - | Label |
| helperText | `string` | - | Helper |
| hasError | `boolean` | `false` | Error state |
| error | `string` | - | Error message |
| required | `boolean` | `false` | Required |
| disabled | `boolean` | `false` | Disabled |
| clearable | `boolean` | `true` | Clear icon |
| size | `TimePickerSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size |
| variant | `TimePickerVariant` (`"default" \| "filled" \| "focused" \| "error" \| "success" \| "disabled" \| "glassmorphic" \| "glass"`) | `"default"` | Style |
| presets | `(string \| TimePickerPreset)[]` | `["Now", "09:00 AM", "12:00 PM", "06:00 PM"]` | Quick picks; `TimePickerPreset = { label: string; value: string \| TimeValue \| Date }` |
| showActions | `boolean` | `true` | Footer (Now, Clear, Apply) |
| placement | `"top" \| "bottom"` | `"bottom"` | Side |
| align | `"left" \| "right"` | `"left"` | Alignment |
| smartPosition | `boolean` | `true` | Auto flip |
| zIndex | `number` | `10050` | z-index |
| usePortal | `boolean` | `true` | Portal |
| popoverWidth | `string \| number` | trigger width (min 260px) | Popover width |
| customWidth | `string \| number` | - | Alias for `popoverWidth` |
| className | `string` | `""` | Root class |
| width | `string \| number` | - | Input container width |

`TimeValue = { hours: number; minutes: number; seconds?: number; period?: "AM" | "PM" }`

```tsx
const [time, setTime] = useState("09:30 AM");
<TimePicker label="Start time" value={time} onChange={(formatted) => setTime(formatted)} minuteStep={15} />
```
Notes: the formatted string looks like `"09:30 AM"` (12h) or `"21:30"` / `"21:30:15"` (24h). With `showActions`, column changes commit only on Apply, while presets and Now commit immediately. Clearing emits `("", <empty TimeValue>)`.

## ColorPicker
Input-triggered color picker with saturation area, hue/alpha sliders, format switch and preset swatches.
Import: `import { ColorPicker, type ColorPickerProps, type ColorPickerSize, type ColorPickerFormat } from "@galyan/ui";`

Ref forwarded (`HTMLDivElement`, root). No native attribute spread.

| Prop | Type | Default | Description |
|---|---|---|---|
| value | `string` | - | Controlled color (`"#5223BC"`, `"rgba(...)"`) |
| defaultValue | `string` | `"#5223BC"` | Uncontrolled initial |
| onChange | `(color: string) => void` | - | Emits in the active format |
| label | `string` | - | Label |
| helperText | `string` | - | Helper |
| hasError | `boolean` | `false` | Error |
| isDisabled | `boolean` | `false` | Disabled |
| disabled | `boolean` | - | Alias for `isDisabled` |
| isRequired | `boolean` | `false` | Required |
| required | `boolean` | - | Alias for `isRequired` |
| showAlpha | `boolean` | `false` | Alpha slider |
| size | `ColorPickerSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size |
| className | `string` | `""` | Class |
| id | `string` | auto | Input id |
| style | `CSSProperties` | - | Inline style |
| placement | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Popover side |
| align | `"start" \| "end" \| "left" \| "right" \| "center"` | `"start"` | Alignment |
| smartPosition | `boolean` | `true` | Auto flip |
| zIndex | `number` | `10050` | z-index |
| presets | `string[]` | built-in palette | Hex swatches |
| placeholder | `string` | `"#HEX"` | Placeholder |
| showClear | `boolean` | `true` | Clear button in popover |
| format | `ColorPickerFormat` (`"hex" \| "rgb" \| "hsl"`) | `"hex"` | Initial input/output format |
| onClear | `() => void` | - | Clear callback |
| usePortal | `boolean` | `true` | Portal |

```tsx
const [color, setColor] = useState("#5223BC");
<ColorPicker label="Brand color" value={color} onChange={setColor} showAlpha />
```
Notes: output string follows the format the user currently has selected: hex (8-digit when alpha < 1 and `showAlpha`), `rgb()`/`rgba()`, or `hsl()`/`hsla()`. Clearing emits `""`.

## FileUpload
Click-or-drag dropzone with a file list, progress, remove/retry.
Import: `import { FileUpload, type FileUploadProps } from "@galyan/ui";` (`UploadedFileItem` / `FileUploadVariant` are not re-exported)

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" \| "glassmorphic" \| "glass"` | `"default"` | Style |
| onFilesSelected | `(files: File[]) => void` | - | Newly selected valid files |
| onRemoveFile | `(file: UploadedFileItem \| File, index: number) => void` | - | Remove clicked |
| onRetryFile | `(file: UploadedFileItem \| File, index: number) => void` | - | Retry clicked (error items) |
| uploadedFiles | `(UploadedFileItem \| File)[]` | - | Externally managed list (syncs when changed) |
| multiple | `boolean` | `false` | Allow multiple (appends; otherwise replaces) |
| accept | `string` | - | Native accept filter |
| maxSize | `number` | - | Max bytes; bigger files are silently dropped |
| maxFiles | `number` | - | Cap on list length |
| disabled | `boolean` | `false` | Disabled |
| label | `string` | `"Click or drag files to upload"` | Dropzone text |
| helperText | `string` | - | Helper |
| simulateUpload | `boolean` | `true` | Fake progress animation |
| className | `string` | `""` | Class |

`UploadedFileItem = { id?: string; name: string; size?: number; type?: string; status?: "uploading" | "completed" | "error"; progress?: number; url?: string }`

```tsx
<FileUpload
  multiple
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  simulateUpload={false}
  uploadedFiles={files}
  onFilesSelected={(newFiles) => upload(newFiles)}
  onRemoveFile={(_, i) => setFiles((f) => f.filter((_, idx) => idx !== i))}
/>
```
Notes: `simulateUpload` defaults to `true`, which shows fake progress; set it to `false` for real uploads and drive status/progress through `uploadedFiles`. The internal list is seeded from `uploadedFiles` and re-synced whenever that prop changes.

## ReorderList
Vertical list reorderable with native HTML5 drag-and-drop (generic `<T>`).
Import: `import { ReorderList, KanbanBoard, type ReorderListProps, type KanbanBoardProps, type KanbanColumnDef } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| items **(required)** | `T[]` | - | Items |
| onReorder **(required)** | `(newItems: T[]) => void` | - | New ordered array |
| keyExtractor **(required)** | `(item: T) => string` | - | Stable key |
| renderItem **(required)** | `(item: T, isDragging: boolean) => ReactNode` | - | Item content (drag handle added automatically) |
| className | `string` | `""` | Class |

```tsx
<ReorderList items={items} onReorder={setItems} keyExtractor={(it) => it.id} renderItem={(it) => <span>{it.name}</span>} />
```

## KanbanBoard
Columns of draggable cards (generic `<T>`).

| Prop | Type | Default | Description |
|---|---|---|---|
| columns **(required)** | `KanbanColumnDef<T>[]` | - | `{ id: string; title: string; items: T[] }` |
| onMove **(required)** | `(itemKey: string, fromCol: string, toCol: string, toIndex: number) => void` | - | Card dropped |
| keyExtractor **(required)** | `(item: T) => string` | - | Stable key |
| renderCard **(required)** | `(item: T, isDragging: boolean) => ReactNode` | - | Card content |
| className | `string` | `""` | Class |

```tsx
const handleMove = (key: string, from: string, to: string, toIndex: number) =>
  setColumns((prev) => {
    const next = prev.map((c) => ({ ...c, items: [...c.items] }));
    const src = next.find((c) => c.id === from)!;
    const dst = next.find((c) => c.id === to)!;
    const [moved] = src.items.splice(src.items.findIndex((t) => t.id === key), 1);
    dst.items.splice(toIndex, 0, moved);
    return next;
  });

<KanbanBoard columns={columns} onMove={handleMove} keyExtractor={(t) => t.id} renderCard={(t) => <div>{t.title}</div>} />
```
Notes: both components are fully controlled. They only report the move, so you update the state yourself. They use native HTML5 DnD, which does not work on touch devices.
