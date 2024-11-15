import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class About extends BaseComponent {
    constructor() {
        super();
        this.loadCSS('About');
    }

    render() {
        const container = document.createElement('section');
        container.id = 'about';

        const header = document.createElement('h1');
        header.textContent = 'About OpenInvite';

        const purpose = document.createElement('p');
        purpose.classList.add('purpose');
        purpose.textContent = 'OpenInvite aims to centralize the process of discovering and engaging with public events. Users can advertise their "open invite" events which are directly visible to the public and displayed within a certain distance of the event\'s location.';

        const teamHeader = document.createElement('h1');
        teamHeader.textContent = 'Our Team';

        const teamCards = document.createElement('div');
        teamCards.id = 'team-cards';

        const teamMembers = [
            { name: 'Erika Lam', role: 'Co-Project Manager / Note-Taker', description: 'Erika co-manages the overall project timeline, ensures that milestones are met, and facilitates collaboration within the team. She creates an agenda before each team meeting to ensure all necessary topics are covered, records detailed notes during meetings, makes sure action items are communicated properly, and distributes meeting minutes to the team after every meeting.' },
            { name: 'Sophia Tang', role: 'Co-Project Manager / Time-Keeper', description: 'Co-manages the overall project timeline, ensures that milestones are met, and facilitates collaboration within the team alongside Erika. She is responsible for keeping team discussions productive focused on project goals. Sophia also manages the timing of all team activities, ensures that meetings start and end on time, and sends out reminders about upcoming meetings and deadlines.' },
            { name: 'Katie Xu', role: 'Task Manager', description: 'Responsible for organizing and tracking individual and team tasks. Katie manages the team’s workflow board and ensures that all tasks are properly assigned and completed on time. She regularly checks in on task completion and overall progress and adjusts plans as necessary to address delays or obstacles.' },
            { name: 'Zhitong Liu', role: 'Communication Lead', description: 'Maintains and manages the team’s communication channels over text and Discord. Ensures that all members stay informed, engaged and aware of any major updates regarding the project. Zhitong also schedules meeting times for the team, facilitates communication within the team, conducts private check-ins with each member and distributes feedback appropriately to resolve conflicts.' },
            { name: 'Mehek Shah', role: 'Quality Control', description: 'Proofreads team submissions and ensures that all deliverables adhere to project guidelines and meet the necessary quality standards. Mehek develops and maintains quality checklists, conducts regular reviews of documents before submission, and identifies areas for improvement within the team’s deliverables.' },
            { name: 'Anne-Colombe Sinkpon', role: 'Documentation Lead', description: 'Responsible for overseeing and maintaining comprehensive project documentation. Anne manages relevant information and revises project plans to ensure all documents are up to date, well-organized, and accessible to team members. She coordinates with the Time Keeper and Task Manager to help the team stay aligned on project objectives and processes.' },
            { name: 'Mason Choi', role: 'Tech Lead', description: 'Oversees the technical development of the project, makes key decisions regarding technologies and tools, and ensures that the application\'s architecture and code quality adhere to project requirements. Mason provides technical direction and expertise to ensure that the best practices are followed in development and implementation.' },
        ];

        teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('team-card');

            const name = document.createElement('h3');
            name.textContent = member.name;

            const role = document.createElement('h5');
            role.textContent = member.role;

            const description = document.createElement('p');
            description.textContent = member.description;

            card.appendChild(name);
            card.appendChild(role);
            card.appendChild(description);
            teamCards.appendChild(card);
        });

        container.appendChild(header);
        container.appendChild(purpose);
        container.appendChild(teamHeader);
        container.appendChild(teamCards);

        return container;
    }
}
