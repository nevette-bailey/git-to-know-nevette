import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("desktop nav renders all links", async ({ page }) => {
        await page.goto("/");
        const nav = page.locator("header nav");
        await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Projects" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Resume" })).toBeVisible();
    });

    test("Resume nav link navigates to /resume", async ({ page }) => {
        await page.goto("/");
        await page.locator("header nav > ul").getByRole("link", { name: "Resume" }).click();
        await expect(page).toHaveURL(/\/resume/);
    });

    test("nav becomes opaque on scroll", async ({ page }) => {
        await page.goto("/");
        const header = page.locator("header");

        // Initially transparent
        await expect(header).not.toHaveClass(/bg-canvas-DEFAULT/);

        // Scroll down past 60px threshold
        await page.evaluate(() => window.scrollBy(0, 200));
        await page.waitForTimeout(600);

        await expect(header).toHaveClass(/bg-canvas-DEFAULT/);
    });
});

test.describe("Mobile navigation", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("hamburger button is visible on mobile", async ({ page }) => {
        await page.goto("/");
        await expect(
            page.getByRole("button", { name: /toggle menu/i })
        ).toBeVisible();
    });

    test("desktop nav links are hidden on mobile", async ({ page }) => {
        await page.goto("/");
        // On mobile, the desktop nav <ul> has `hidden md:flex` — not visible at 390px width
        const desktopNavLinks = page.locator("header nav > ul");
        await expect(desktopNavLinks).toBeHidden();
    });

    test("mobile menu opens and shows links", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: /toggle menu/i }).click();
        // Mobile menu contains the same links
        const mobileMenu = page.locator("header .md\\:hidden.bg-canvas-DEFAULT");
        await expect(mobileMenu).toBeVisible();
    });

    test("clicking a mobile menu link closes the menu", async ({ page }) => {
        await page.goto("/");
        const hamburger = page.getByRole("button", { name: /toggle menu/i });
        await hamburger.click();

        // Click a link in the mobile menu
        const mobileMenu = page.locator("header .md\\:hidden.bg-canvas-DEFAULT");
        await mobileMenu.getByText("About").click();

        // Menu should close (max-h-0)
        await expect(mobileMenu).toHaveClass(/max-h-0/);
    });
});
