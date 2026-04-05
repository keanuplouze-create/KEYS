// Global Shared Data für die ganze Klasse
class ClassData {
    constructor() {
        this.todos = [];
        this.lastUpdate = 0;
    }

    addTodo(author, title) {
        this.todos.push({
            id: Date.now(),
            author: author,
            title: title,
            completed: false,
            date: new Date().toLocaleString('de-DE')
        });
        this.saveToGlobal();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) todo.completed = !todo.completed;
        this.saveToGlobal();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveToGlobal();
    }

    saveToGlobal() {
        // Speichere in window für alle Fenster
        window.classDataGlobal = this.todos;
        localStorage.setItem('CLASS_DATA_V3', JSON.stringify(this.todos));
    }

    loadFromGlobal() {
        const saved = localStorage.getItem('CLASS_DATA_V3');
        if (saved) {
            try {
                this.todos = JSON.parse(saved);
            } catch(e) {
                this.todos = [];
            }
        }
    }
}

const classData = new ClassData();
classData.loadFromGlobal();
