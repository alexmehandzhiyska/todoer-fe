export const baseUrl = 'http://localhost:8000/api';

export const categoryIcons = {
    inbox: {
        icon: 'fa-inbox',
        color: '#1cb0f8',
        query: ''
    },
    today: {
        icon: 'fa-star',
        color: '#ffd303',
        query: '?day=today'
    },
    tomorrow: {
        icon: 'fa-calendar',
        color: '#fe306b',
        query: '?day=tomorrow'
    },
    upcoming: {
        icon: 'fa-layer-group',
        color: '#37a49b',
        query: '?day=upcoming'
    }
};