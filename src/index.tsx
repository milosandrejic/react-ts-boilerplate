import {createRoot} from "react-dom/client";
import React from "react";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Login from "pages/login";
import PageOne from "pages/pageOne";
import PageTwo from "pages/pageTwo";
import PageTree from "pages/pageTree";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Login />
    },
    {
        path: "/page-one",
        element: <PageOne />
    },
    {
        path: "/page-two",
        element: <PageTwo />
    },
    {
        path: "/page-tree",
        element: <PageTree />
    },
]);

const container = document.getElementById("app");

if (container) {
    const root = createRoot(container);

    root.render(<RouterProvider router={router} />);
}
