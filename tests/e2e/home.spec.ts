import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
    test("loads with the correct page title", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/Nevette/i);
    });

    test("hero displays name and tagline", async ({ page }) => {
        await page.goto("/");
        await expect(
            page.getByRole("heading", { name: /Nevette A\. Bailey/i }).first()
        ).toBeVisible();
        await expect(
            page.getByText(/I build systems that scale/i)
        ).toBeVisible();
    });

    test("hero CTAs are present and linked correctly", async ({ page }) => {
        await page.goto("/");
        const letsTalk = page.getByRole("link", { name: /let.s talk/i }).first();
        await expect(letsTalk).toBeVisible();
        await expect(letsTalk).toHaveAttribute(
            "href",
            "mailto:contact@nevettebailey.com"
        );

        const viewWork = page.getByRole("link", { name: /view work/i });
        await expect(viewWork).toBeVisible();
        await expect(viewWork).toHaveAttribute("href", "#work");
    });

    test("social links are present", async ({ page }) => {
        await page.goto("/");
        await expect(
            page.getByRole("link", { name: "LinkedIn" }).first()
        ).toBeVisible();
        await expect(
            page.getByRole("link", { name: "GitHub" }).first()
        ).toBeVisible();
        await expect(
            page.getByRole("link", { name: "Scholar" }).first()
        ).toBeVisible();
    });

    test("projects section renders all three projects", async ({ page }) => {
        await page.goto("/");
        await page.locator("#projects").scrollIntoViewIfNeeded();
        await expect(page.getByText("First On Screen").first()).toBeVisible();
        await expect(page.getByText("Glitter Brain").first()).toBeVisible();
        await expect(page.getByText("Tether").first()).toBeVisible();
    });

    test("footer shows copyright year", async ({ page }) => {
        await page.goto("/");
        const year = new Date().getFullYear().toString();
        await expect(page.getByText(new RegExp(`© ${year}`))).toBeVisible();
    });
});
