import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import Hero from "@/components/Hero";

vi.mock("next/dynamic", () => ({
    default: (_importFn: unknown) =>
        function DynamicPlaceholder() {
            return <div data-testid="portrait-sketch" />;
        },
}));

describe("Hero", () => {
    it("renders the name", () => {
        render(<Hero />);
        expect(screen.getByText("Nevette A.")).toBeInTheDocument();
        expect(screen.getByText("Bailey")).toBeInTheDocument();
    });

    it("renders the Ph.D. suffix", () => {
        render(<Hero />);
        expect(screen.getByText(", Ph.D.")).toBeInTheDocument();
    });

    it("renders the tagline", () => {
        render(<Hero />);
        expect(
            screen.getByText(/I build systems that scale/i)
        ).toBeInTheDocument();
    });

    it("renders the section label", () => {
        render(<Hero />);
        expect(
            screen.getByText(/Technical Leader/i)
        ).toBeInTheDocument();
    });

    it("renders Let's Talk CTA linking to email", () => {
        render(<Hero />);
        const cta = screen.getByRole("link", { name: /let.s talk/i });
        expect(cta).toHaveAttribute("href", "mailto:contact@nevettebailey.com");
    });

    it("renders View Work anchor link", () => {
        render(<Hero />);
        const viewWork = screen.getByRole("link", { name: /view work/i });
        expect(viewWork).toHaveAttribute("href", "#work");
    });

    it("renders LinkedIn, GitHub, and Scholar social links", () => {
        render(<Hero />);
        expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
            "href",
            "https://www.linkedin.com/in/nevetteb"
        );
        expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
            "href",
            "https://github.com/nevette-bailey"
        );
        expect(screen.getByRole("link", { name: /scholar/i })).toBeInTheDocument();
    });

    it("renders the portrait sketch placeholder", () => {
        render(<Hero />);
        expect(screen.getByTestId("portrait-sketch")).toBeInTheDocument();
    });
});
