import { makeAutoObservable } from "mobx";

class RemindersStore {
  reminders = [
    { id: 1, title: "Test1", date: Date.now(), audioUri: null },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  getReminder(id: number) {
    return this.reminders.find(r => r.id === id);
  }

  addReminder(reminder: any) {
    this.reminders.push(reminder);
  }

  updateReminder(id: number, updates: Partial<{title: string; date: number;}>) {
    const index = this.reminders.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reminders[index] = { ...this.reminders[index], ...updates };
    }
  }

  deleteReminder(id: number) {
    this.reminders = this.reminders.filter(r => r.id !== id);
  }
}

export const remindersStore = new RemindersStore();
