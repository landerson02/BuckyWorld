import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../leaderboard/Page.tsx"; 
import { UserContext } from "@/lib/UserContext";
import { getTop10Users, getLeaderboardRanking } from "@/lib/Service";
import '@testing-library/jest-dom';

// mock functions in service
jest.mock("@/lib/Service");

/**
 * tests the information displayed on the leaderboard page
 */
describe("Leaderboard Page", () => {

    // create a mock user
    const userMock = { username: "testuser", points: 100 };

    // mocked top 10 users
    beforeEach(() => {
    getTop10Users.mockResolvedValue([
        { username: "user1", points: 150 },
        { username: "user2", points: 140 },
        { username: "user3", points: 130 },
    ]);

    // ranking
    getLeaderboardRanking.mockResolvedValue(4);
    });


    // wait for loading to go away
    test("renders and shows loading state", async () => {

        render(
            <UserContext.Provider value={{ user: userMock }}>
            <Page />
            </UserContext.Provider>
        );

        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });
    });


    // checks username and point displayed
    test("displays top users after fetching data", async () => {
        render(
            <UserContext.Provider value={{ user: userMock }}>
            <Page />
            </UserContext.Provider>
        );

        // check top 10 are displayed
        await waitFor(() => {
            expect(screen.getByText("user1")).toBeInTheDocument();
            expect(screen.getByText("150")).toBeInTheDocument();

            expect(screen.getByText("user2")).toBeInTheDocument();
            expect(screen.getByText("140")).toBeInTheDocument();

            expect(screen.getByText("user3")).toBeInTheDocument();
            expect(screen.getByText("130")).toBeInTheDocument();
        });
    });

    // leaderboard position displayed
    test("displays the user's position on the leaderboard", async () => {
        render(
            <UserContext.Provider value={{ user: userMock }}>
            <Page />
            </UserContext.Provider>
        );

        // position info displayed
        await waitFor(() => {
            expect(screen.getByText("Your position is:")).toBeInTheDocument();
            expect(screen.getByText("4")).toBeInTheDocument();
        });
    });
    
});
