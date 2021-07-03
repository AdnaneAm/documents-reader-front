export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: 'menuitems.dashboard.text',
        icon: 'ri-dashboard-line',
        badge: {
            variant: "success",
            text: "menuitems.dashboard.badge"
        },
        link: '/'
    },
    {
        id: 4,
        label: 'menuitems.documents.list',
        icon: 'ri-dashboard-line',
        link: '/documents/',
    },
    {
        id: 5,
        label: 'menuitems.documents.create',
        icon: 'ri-dashboard-line',
        link: '/documents/create',
    }
]