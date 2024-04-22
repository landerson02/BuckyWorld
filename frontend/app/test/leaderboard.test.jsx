import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../leaderboard/Page.tsx"; 
import { UserContext } from "@/lib/UserContext";
import { getTop10Users, getLeaderboardRanking } from "@/lib/Service";
import '@testing-library/jest-dom';

jest.mock("@/lib/Service");

describe("Leaderboard Page", () => {
  const userMock = { username: "testuser", points: 100 };

  beforeEach(() => {
    getTop10Users.mockResolvedValue([
      { username: "user1", points: 150 },
      { username: "user2", points: 140 },
      { username: "user3", points: 130 },
    ]);
    getLeaderboardRanking.mockResolvedValue(4);
  });

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

  test("displays top users after fetching data", async () => {
    render(
      <UserContext.Provider value={{ user: userMock }}>
        <Page />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("user1")).toBeInTheDocument();
      expect(screen.getByText("150")).toBeInTheDocument();
    });
  });

  test("displays the user's position on the leaderboard", async () => {
    render(
      <UserContext.Provider value={{ user: userMock }}>
        <Page />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Your position is:")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
    });
  });
});
