import store from '../state/modules'
const role = store.auth.state.currentUser.user.role;
console.log(role);
let menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label:"menuitems.dashboard.text",
        link:"/",
        icon: 'ri-dashboard-line',
    },
    {
        id: 3,
        label: 'menuitems.documents.text',
        icon: 'ri-attachment-line',
        subItems:[
            {
                id: 4,
                label: 'menuitems.documents.list',
                icon: 'ri-file-list-line',
                link: '/documents/',
            },
            {
                id: 5,
                label: 'menuitems.documents.create',
                icon: 'ri-add-line',
                link: '/documents/create',
            }
        ]
    }
]
if(role == 'admin'){
    const adminItems = [
        {
            id:6,
            label:'menuitems.users.text',
            icon: 'ri-group-line',
            subItems:[
                {
                    id:7,
                    label:'menuitems.users.list',
                    link:'/users/'
                },
                {
                    id:8,
                    label:'menuitems.users.create',
                    link:'/users/create'
                }
            ]
        }
    ]
    menuItems = menuItems.concat(adminItems)
}
export {menuItems};