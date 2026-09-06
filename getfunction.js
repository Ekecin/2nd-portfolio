import supabaseClient from "./supabase.js";


async function loadProjects() {
    const projectsContainer = document.querySelector(".projects");

    if (!projectsContainer) {
        console.error("Projects container not found.");
        return;
    }

    try {
        const { data: projects, error } = await supabaseClient
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        console.log("Projects:", projects);

        if (!projects || projects.length === 0) {
            projectsContainer.innerHTML = `
                <p class="projects-message">
                    No projects available yet.
                </p>
            `;
            return;
        }

        projectsContainer.innerHTML = projects.map((project, index) => {

            const number = String(index + 1).padStart(2, "0");

            let visual;

            const title = (project.title || "").toLowerCase();

            if (title.includes("marketplace")) {

                visual = `
                    <div class="project-visual project-one">
                        <span>${number}</span>

                        <div class="mock-window marketplace-window">
                            <div class="window-bar">
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>

                            <strong>MARKETPLACE</strong>

                            <div class="product-row">
                                <b></b>
                                <b></b>
                                <b></b>
                            </div>

                            <small>
                                Browse • Sell • Discover
                            </small>
                        </div>
                    </div>
                `;

            } else if (title.includes("queue")) {

                visual = `
                    <div class="project-visual project-two">
                        <span>${number}</span>

                        <div class="phone queue-phone">
                            <i></i>
                            <strong>QUEUE</strong>
                            <em>NOW SERVING</em>
                            <b>027</b>
                            <small>Estimated wait</small>
                            <div class="queue-line"></div>
                        </div>
                    </div>
                `;

            } else if (
                title.includes("ai") ||
                title.includes("chatbot")
            ) {

                visual = `
                    <div class="project-visual project-three">
                        <span>${number}</span>

                        <div class="chat-ui">
                            <strong>AI</strong>
                            <p>How can I help?</p>

                            <div></div>
                            <div></div>
                            <div></div>

                            <small>
                                AI-powered interface
                            </small>
                        </div>
                    </div>
                `;

            } else {

                visual = `
                    <div class="project-visual project-default">
                        <span>${number}</span>

                        <div class="default-project-card">
                            <div class="default-icon">↗</div>

                            <strong>${project.title}</strong>

                            <small>DIGITAL PROJECT</small>
                        </div>
                    </div>
                `;
            }

            return `
    <a
        href="${project.live_demo || "#"}"
        class="project reveal"
        target="_blank"
        rel="noopener noreferrer"
    >

        ${visual}

        <div class="project-info">
            <div>
                <h3>${project.title}</h3>
                <p>${project.description || ""}</p>
            </div>

            <span class="arrow">↗</span>
        </div>

    </a>
`;

        }).join("");

    } catch (error) {
        console.error("Error loading projects:", error);

        projectsContainer.innerHTML = `
            <p class="projects-message">
                Unable to load projects right now.
            </p>
        `;
    }
}

loadProjects();