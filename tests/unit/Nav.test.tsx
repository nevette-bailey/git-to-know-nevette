import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import Nav from "@/components/Nav";

vi.mock("next/image", () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        <img src={src} alt={alt} />
    ),
}));

vi.mock("next/link", () => ({
    default: ({
        href,
        children,
        className,
        "aria-label": ariaLabel,
    }: {
        href: string;
        children: React.ReactNode;
        className?: string;
        "aria-label"?: string;
    }) => (
        <a href={href} className={className} aria-label={ariaLabel}>
            {children}
        </a>
    ),
}));

describe("Nav", () => {
    it("renders all desktop navigation links", () => {
        render(<Nav />);
        expect(screen.getAllByText("About").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Work").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Projects").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Resume").length).toBeGreaterThan(0);
    });

    it("renders the Let's Talk CTA", () => {
        render(<Nav />);
        const ctaLinks = screen.getAllByText(/Let.s Talk/i);
        expect(ctaLinks.length).toBeGreaterThan(0);
        expect(ctaLinks[0].closest("a")).toHaveAttribute(
            "href",
            "mailto:contact@nevettebailey.com"
        );
    });

    it("renders logo with correct alt text", () => {
        render(<Nav />);
        expect(screen.getByAltText("Nevette Bailey")).toBeInTheDocument();
    });

    it("hamburger button is present", () => {
        render(<Nav />);
        expect(
            screen.getByRole("button", { name: /toggle menu/i })
        ).toBeInTheDocument();
    });

    it("mobile menu starts closed", () => {
        render(<Nav />);
        const hamburger = screen.getByRole("button", { name: /toggle menu/i });
        const spans = hamburger.querySelectorAll("span");
        expect(spans[0]).not.toHaveClass("rotate-45");
        expect(spans[1]).not.toHaveClass("opacity-0");
    });

    it("hamburger animates to X when clicked", async () => {
        const user = userEvent.setup();
        render(<Nav />);
        const hamburger = screen.getByRole("button", { name: /toggle menu/i });
        await user.click(hamburger);
        const spans = hamburger.querySelectorAll("span");
        expect(spans[0]).toHaveClass("rotate-45");
        expect(spans[1]).toHaveClass("opacity-0");
        expect(spans[2]).toHaveClass("-rotate-45");
    });

    it("hamburger closes menu on second click", async () => {
        const user = userEvent.setup();
        render(<Nav />);
        const hamburger = screen.getByRole("button", { name: /toggle menu/i });
        await user.click(hamburger);
        await user.click(hamburger);
        const spans = hamburger.querySelectorAll("span");
        expect(spans[0]).not.toHaveClass("rotate-45");
    });
});
