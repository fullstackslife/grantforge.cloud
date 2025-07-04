import json
import tkinter as tk
from datetime import datetime
from pathlib import Path
from tkinter import ttk
from typing import Dict, List, Optional, Set

class GrantBrowserGUI:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title("Grant Browser")
        self.root.geometry("1200x800")
        
        # Load grants
        self.grants = self.load_grants()
        self.categories = self.get_unique_categories()
        self.all_tags = self.get_all_tags()
        
        # Create main layout
        self.create_layout()
        
        # Initialize filters
        self.filtered_grants = self.grants.copy()
        self.update_grant_list()

    def load_grants(self) -> List[Dict]:
        """Load grants from tagged_grants.json."""
        try:
            grants_file = Path("../data/tagged_grants.json")
            with open(grants_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading grants: {e}")
            return []

    def get_unique_categories(self) -> List[str]:
        """Get unique categories from grants."""
        categories = {grant.get('category', 'Uncategorized') for grant in self.grants}
        return sorted(list(categories))

    def get_all_tags(self) -> Set[str]:
        """Get all unique tags from grants."""
        tags = set()
        for grant in self.grants:
            tags.update(grant.get('tags', []))
        return sorted(tags)

    def create_layout(self):
        """Create the main GUI layout."""
        # Create main container
        main_container = ttk.PanedWindow(self.root, orient=tk.HORIZONTAL)
        main_container.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        # Left panel (filters and list)
        left_panel = ttk.Frame(main_container)
        main_container.add(left_panel, weight=1)

        # Right panel (details)
        right_panel = ttk.Frame(main_container)
        main_container.add(right_panel, weight=2)

        # Create filter section
        self.create_filters(left_panel)
        
        # Create grant list
        self.create_grant_list(left_panel)
        
        # Create details view
        self.create_details_view(right_panel)

    def create_filters(self, parent: ttk.Frame):
        """Create filter controls."""
        filter_frame = ttk.LabelFrame(parent, text="Filters")
        filter_frame.pack(fill=tk.X, padx=5, pady=5)

        # Category filter
        ttk.Label(filter_frame, text="Category:").pack(anchor=tk.W, padx=5, pady=2)
        self.category_var = tk.StringVar(value="All")
        category_combo = ttk.Combobox(
            filter_frame, 
            textvariable=self.category_var,
            values=["All"] + self.categories,
            state="readonly"
        )
        category_combo.pack(fill=tk.X, padx=5, pady=2)
        category_combo.bind('<<ComboboxSelected>>', lambda e: self.apply_filters())

        # Tag filter
        ttk.Label(filter_frame, text="Tags (comma-separated):").pack(anchor=tk.W, padx=5, pady=2)
        self.tag_var = tk.StringVar()
        tag_entry = ttk.Entry(filter_frame, textvariable=self.tag_var)
        tag_entry.pack(fill=tk.X, padx=5, pady=2)
        
        # Tag suggestions
        self.tag_suggestions = ttk.Combobox(
            filter_frame,
            values=list(self.all_tags),
            state="readonly"
        )
        self.tag_suggestions.pack(fill=tk.X, padx=5, pady=2)
        self.tag_suggestions.bind('<<ComboboxSelected>>', self.on_tag_suggestion_selected)
        
        # Add tag button
        add_tag_btn = ttk.Button(
            filter_frame,
            text="Add Tag",
            command=self.add_suggested_tag
        )
        add_tag_btn.pack(fill=tk.X, padx=5, pady=2)
        
        # Bind tag entry changes
        tag_entry.bind('<KeyRelease>', self.on_tag_entry_change)

        # Deadline filter
        ttk.Label(filter_frame, text="Deadline:").pack(anchor=tk.W, padx=5, pady=2)
        deadline_frame = ttk.Frame(filter_frame)
        deadline_frame.pack(fill=tk.X, padx=5, pady=2)
        
        self.deadline_var = tk.StringVar(value="All")
        deadline_combo = ttk.Combobox(
            deadline_frame,
            textvariable=self.deadline_var,
            values=["All", "This Week", "This Month", "Next 3 Months"],
            state="readonly"
        )
        deadline_combo.pack(side=tk.LEFT, fill=tk.X, expand=True)
        deadline_combo.bind('<<ComboboxSelected>>', lambda e: self.apply_filters())

    def on_tag_entry_change(self, event):
        """Handle tag entry changes and update suggestions."""
        current_text = self.tag_var.get().strip()
        if not current_text:
            return

        # Get the last word after the last comma
        last_word = current_text.split(',')[-1].strip().lower()
        if not last_word:
            return

        # Filter suggestions based on the last word
        suggestions = [tag for tag in self.all_tags if last_word in tag.lower()]
        self.tag_suggestions['values'] = suggestions
        if suggestions:
            self.tag_suggestions.set(suggestions[0])

    def on_tag_suggestion_selected(self, event):
        """Handle tag suggestion selection."""
        selected = self.tag_suggestions.get()
        if not selected:
            return

        current_tags = [t.strip() for t in self.tag_var.get().split(',') if t.strip()]
        if selected not in current_tags:
            current_tags.append(selected)
            self.tag_var.set(', '.join(current_tags))
            self.apply_filters()

    def add_suggested_tag(self):
        """Add the currently suggested tag to the filter."""
        self.on_tag_suggestion_selected(None)

    def create_grant_list(self, parent: ttk.Frame):
        """Create the scrollable grant list."""
        list_frame = ttk.LabelFrame(parent, text="Grants")
        list_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        # Create treeview
        columns = ("title", "agency", "deadline", "tags")
        self.grant_tree = ttk.Treeview(
            list_frame,
            columns=columns,
            show="headings",
            selectmode="browse"
        )

        # Configure columns
        self.grant_tree.heading("title", text="Title")
        self.grant_tree.heading("agency", text="Agency")
        self.grant_tree.heading("deadline", text="Deadline")
        self.grant_tree.heading("tags", text="Tags")
        
        self.grant_tree.column("title", width=200)
        self.grant_tree.column("agency", width=150)
        self.grant_tree.column("deadline", width=100)
        self.grant_tree.column("tags", width=150)

        # Add scrollbar
        scrollbar = ttk.Scrollbar(list_frame, orient=tk.VERTICAL, command=self.grant_tree.yview)
        self.grant_tree.configure(yscrollcommand=scrollbar.set)
        
        # Pack widgets
        self.grant_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Bind selection event
        self.grant_tree.bind('<<TreeviewSelect>>', self.on_grant_select)

    def create_details_view(self, parent: ttk.Frame):
        """Create the detailed grant view."""
        details_frame = ttk.LabelFrame(parent, text="Grant Details")
        details_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        # Create text widget for details
        self.details_text = tk.Text(
            details_frame,
            wrap=tk.WORD,
            padx=10,
            pady=10,
            state=tk.DISABLED
        )
        self.details_text.pack(fill=tk.BOTH, expand=True)

    def update_grant_list(self):
        """Update the grant list with filtered results."""
        # Clear existing items
        for item in self.grant_tree.get_children():
            self.grant_tree.delete(item)

        # Add filtered grants
        for grant in self.filtered_grants:
            metadata = grant.get('metadata', {})
            self.grant_tree.insert(
                "",
                tk.END,
                values=(
                    grant.get('title', ''),
                    grant.get('agency', ''),
                    metadata.get('Close Date', ''),
                    ', '.join(grant.get('tags', []))
                ),
                tags=(grant.get('category', ''),)
            )

    def apply_filters(self):
        """Apply current filters to the grant list."""
        self.filtered_grants = self.grants.copy()

        # Apply category filter
        category = self.category_var.get()
        if category != "All":
            self.filtered_grants = [
                g for g in self.filtered_grants
                if g.get('category') == category
            ]

        # Apply tag filter
        tag_filter = self.tag_var.get().strip()
        if tag_filter:
            tags_to_match = {t.strip().lower() for t in tag_filter.split(',') if t.strip()}
            self.filtered_grants = [
                g for g in self.filtered_grants
                if any(tag.lower() in [t.lower() for t in g.get('tags', [])]
                      for tag in tags_to_match)
            ]

        # Apply deadline filter
        deadline = self.deadline_var.get()
        if deadline != "All":
            today = datetime.now()
            filtered = []
            
            for grant in self.filtered_grants:
                close_date = grant.get('metadata', {}).get('Close Date')
                if not close_date:
                    continue
                    
                try:
                    grant_date = datetime.fromisoformat(close_date.replace('Z', '+00:00'))
                    if deadline == "This Week" and (grant_date - today).days <= 7:
                        filtered.append(grant)
                    elif deadline == "This Month" and (grant_date - today).days <= 30:
                        filtered.append(grant)
                    elif deadline == "Next 3 Months" and (grant_date - today).days <= 90:
                        filtered.append(grant)
                except ValueError:
                    continue
            
            self.filtered_grants = filtered

        self.update_grant_list()

    def on_grant_select(self, event):
        """Handle grant selection and update details view."""
        selection = self.grant_tree.selection()
        if not selection:
            return

        # Get selected grant
        index = self.grant_tree.index(selection[0])
        grant = self.filtered_grants[index]

        # Update details view
        self.details_text.config(state=tk.NORMAL)
        self.details_text.delete(1.0, tk.END)
        
        # Format grant details
        details = f"""Title: {grant.get('title', 'N/A')}
Agency: {grant.get('agency', 'N/A')}
Category: {grant.get('category', 'N/A')}
Tags: {', '.join(grant.get('tags', []))}

Eligibility:
{grant.get('eligibility_summary', 'N/A')}

Urgency Score: {grant.get('urgency_score', 'N/A')}/5

Description:
{grant.get('description', 'N/A')}

Metadata:
"""
        # Add metadata
        for key, value in grant.get('metadata', {}).items():
            details += f"{key}: {value}\n"

        self.details_text.insert(1.0, details)
        self.details_text.config(state=tk.DISABLED)

def main():
    root = tk.Tk()
    app = GrantBrowserGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main() 