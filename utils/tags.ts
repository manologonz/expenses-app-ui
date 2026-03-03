import z from "zod";

export function getTagValidationObject(opt?: { subtag: boolean }) {
    const validationObject: {
        parent: z.ZodOptional<z.ZodInt>;
        name: z.ZodString;
        color?: z.ZodString;
    } = {
        parent: z.int().optional(),
        name: z.string().min(1, {
            message: "This field is required.",
        }),
    };

    if (!opt?.subtag) {
        validationObject["color"] = z.string().regex(/^#[0-9a-fA-F]{6}$/, {
            message: "Invalid Hex color format.",
        });
    }

    return validationObject;
}
