import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Projects from "@/components/Projects";

describe("Projects", () => {
    it("renders all three project titles", () => {
        render(<Projects />);
        expect(screen.getAllByText("First On Screen").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Glitter Brain").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Tether").length).toBeGreaterThan(0);
    });

    it("renders project subtitles", () => {
        render(<Projects />);
        expect(screen.getByText("Representation Tracker")).toBeInTheDocument();
        expect(screen.getByText("ADHD Productivity Automation")).toBeInTheDocument();
        expect(screen.getByText("Dog-Centered Dating App")).toBeInTheDocument();
    });

    it("renders project status labels", () => {
        render(<Projects />);
        expect(
            screen.getByText("Featured Project · Active")
        ).toBeInTheDocument();
        expect(screen.getByText("Personal Project · Active")).toBeInTheDocument();
        expect(screen.getByText("Product · In Development")).toBeInTheDocument();
    });

    it("renders project descriptions", () => {
        render(<Projects />);
        expect(
            screen.getByText(/ethical ML system for tracking media representation/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/ADHD brain actually works/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/dating app built for people who center their lives around their dogs/i)
        ).toBeInTheDocument();
    });

    it("renders technology tags", () => {
        render(<Projects />);
        const fastApiTags = screen.getAllByText("FastAPI");
        expect(fastApiTags.length).toBeGreaterThan(0);
        const flutterTags = screen.getAllByText("Flutter");
        expect(flutterTags.length).toBeGreaterThan(0);
        const supabaseTags = screen.getAllByText("Supabase");
        expect(supabaseTags.length).toBeGreaterThan(0);
    });

    it("renders the section header", () => {
        render(<Projects />);
        expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    it("renders the section number", () => {
        render(<Projects />);
        expect(screen.getByText("04")).toBeInTheDocument();
    });
});
