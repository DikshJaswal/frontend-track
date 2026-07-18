# AI Workflow Comparison

## Feature

The feature implemented in both branches was a React Settings Form.

---

## Round One (Vague Prompt)

Prompt used:

"Create a settings form in React."

The generated implementation produced a functional settings form but required more manual review. It included additional fields that were not requested, lacked clear validation requirements, and the overall structure was less focused on accessibility and verification.

Reviewing the generated code required checking field behavior, simplifying the structure, and understanding what the AI decided automatically.

---

## Round Two (Detailed Prompt)

The second implementation used a detailed specification describing:

- React + Vite + TypeScript

- Required fields

- Validation rules

- Accessibility requirements

- Responsive layout

- Constraints

- Verification instructions

The generated code included inline validation, accessible labels, proper error messages, success feedback, reset functionality, and cleaner component organization.

The review process was much faster because most requirements were already satisfied.

---

## Comparison

Comparing both branches showed several concrete differences.

Round One generated a larger form with unnecessary fields such as a bio section and different state management.

Round Two generated a smaller, more focused component with validation, better accessibility, clearer CSS naming, and improved user feedback.

The detailed prompt also produced more maintainable code with separate validation logic and cleaner styling.

Although writing the detailed prompt took longer, the total development time was lower because fewer corrections were needed.

---

## AI Mistake I Caught

The AI kept portions of the default Vite starter interface inside App.tsx instead of replacing it completely with the application UI. This required manual review to identify.

---

## Lessons Learned

- Detailed prompts produce more reliable code.

- Explicit constraints reduce unnecessary implementation.

- Asking the AI to verify its own work improves quality.

- Reviewing generated code is still necessary before accepting it.