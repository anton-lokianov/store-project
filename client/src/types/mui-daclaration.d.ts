import { DefaultTextFieldClasses } from "@mui/material/TextField";
import { OutlinedInputClasses } from "@mui/material/OutlinedInput";

declare module "@mui/material/TextField" {
  interface TextFieldClasses extends DefaultTextFieldClasses {
    input: string;
  }
}

declare module "@mui/material/OutlinedInput" {
  interface OutlinedInputClasses {
    focusedNotchedOutline: string;
  }
}
