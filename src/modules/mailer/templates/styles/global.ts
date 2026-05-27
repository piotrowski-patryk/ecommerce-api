import { theme } from './theme.js';

export const global = {
    body: {
        margin: 0,
        padding: '20px 0',
        backgroundColor: theme.background.secondary,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: theme.fontSize.base,
    },

    container: {
        backgroundColor: theme.background.primary
    },

    h1: { 
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
        color: theme.color.primary,
        textAlign: 'center'
    },
    
    h2: { 
        fontSize: theme.fontSize.base,
        fontWeight: theme.fontSize.xl,
        color: theme.color.primary
    },

    p: {
        fontSize: theme.fontSize.base,
        color: theme.color.primary
    }
}