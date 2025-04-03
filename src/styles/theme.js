import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#1976D2',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FFC107',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  roundness: 8,
};

export const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Estilos para formularios
  form: {
    padding: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },

  // Estilos para cards
  card: {
    margin: theme.spacing.sm,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    paddingVertical: theme.spacing.sm,
  },

  // Estilos para listas
  listItem: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  listItemText: {
    fontSize: 16,
  },

  // Estilos para tablas
  table: {
    margin: theme.spacing.sm,
  },
  tableHeader: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
  },
  tableHeaderText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
    padding: theme.spacing.sm,
  },
  tableCell: {
    flex: 1,
    padding: theme.spacing.xs,
  },

  // Estilos para mensajes
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginBottom: theme.spacing.sm,
  },
  successText: {
    color: theme.colors.success,
    fontSize: 14,
    marginBottom: theme.spacing.sm,
  },

  // Estilos para modales
  modal: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.roundness,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },

  // Estilos para navegación
  header: {
    backgroundColor: theme.colors.primary,
    height: 56,
    elevation: 4,
  },
  headerTitle: {
    color: theme.colors.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
};