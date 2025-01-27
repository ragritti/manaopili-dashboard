import { toast } from "sonner";

export async function copyTextToClipboard(text = '') {

    if (typeof (text) !== 'string') return
    if ("clipboard" in navigator) {
        toast("Copied to clipboard", {
            type: "success",
            position: "top-right"
        })
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand("copy", true, text);
    }
}