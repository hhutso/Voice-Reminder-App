import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FF5C1B',
  background: '#FFFFFF',
  card: '#FFFFFF',
  textDark: '#333333',
  textLight: '#FFFFFF',
  border: '#E0E0E0',
  gray: '#888888',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textLight,
  },
  newReminderContainer: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recordButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 16,
  },
  reminderList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  reminderCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  reminderDate: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  playButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: colors.textLight,
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    borderRadius: 10, 
    height: '80%',
  },
  deleteButtonText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center', 
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 10, 
    height: '80%',
  },
  editButtonText: {
    color: colors.textLight,  
    fontWeight: '600',
    fontSize: 16,
  },
  reminderTitleInput: {
  fontSize: 18,
  fontWeight: "bold",
  borderBottomWidth: 1,
  borderColor: "#ccc",
  paddingVertical: 2,
},

});
