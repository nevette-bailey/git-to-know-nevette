import { test, expect } from "@playwright/test";

test.describe("Resume page", () => {
    test("loads with the correct page title", async ({ page }) => {
        await page.goto("/resume");
        await expect(page).toHaveTitle(/Resume.*Nevette/i);
    });

    test("displays name header", async ({ page }) => {
        await page.goto("/resume");
        await expect(page.getByRole("heading", { name: /Nevette Bailey/i })).toBeVisible();
    });

    test("renders the experience section with key roles", async ({ page }) => {
        await page.goto("/resume");
        // Use the company | location text which is unique per job entry
        await expect(page.getByText("Etsy | Brooklyn, NY")).toBeVisible();
        await expect(
            page.getByText(/Vice President of Engineering/i)
        ).toBeVisible();
        await expect(page.getByText("Senior Software Engineer").first()).toBeVisible();
    });

    test("skills section is present", async ({ page }) => {
        await page.goto("/resume");
        await expect(
            page.getByRole("heading", { name: /skills/i })
        ).toBeVisible();
        await expect(page.getByText(/Languages & Frameworks/i)).toBeVisible();
    });

    test("education section is present", async ({ page }) => {
        await page.goto("/resume");
        await expect(
            page.getByRole("heading", { name: /education/i })
        ).toBeVisible();
        await expect(page.getByText("Northwestern University")).toBeVisible();
    });

    test("PDF download link is present", async ({ page }) => {
        await page.goto("/resume");
        const downloadLink = page.getByRole("link", { name: /download pdf/i });
        await expect(downloadLink).toBeVisible();
        await expect(downloadLink).toHaveAttribute("download");
    });

    test("contact info links are present", async ({ page }) => {
        await page.goto("/resume");
        await expect(
            page.getByRole("link", { name: "LinkedIn" })
        ).toBeVisible();
        await expect(
            page.getByRole("link", { name: "GitHub" })
        ).toBeVisible();
        await expect(
            page.getByRole("link", { name: "Google Scholar" })
        ).toBeVisible();
    });
});
