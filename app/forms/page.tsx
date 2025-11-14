"use client"

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState } from "react";
import AppLayout from "@/app/layouts/AppLayout";

interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: Date;
}

export default function Forms() {
  const [forms, setForms] = useState<Form[]>([]);
  const [currentForm, setCurrentForm] = useState<Form | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Number' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'date', label: 'Date Picker' },
  ];

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < fields.length) {
      [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
      setFields(newFields);
    }
  };

  const saveForm = () => {
    if (!formTitle.trim()) {
      alert('Please enter a form title');
      return;
    }

    const newForm: Form = {
      id: `form-${Date.now()}`,
      title: formTitle,
      description: formDescription,
      fields,
      createdAt: new Date(),
    };

    setForms([...forms, newForm]);
    setFormTitle('');
    setFormDescription('');
    setFields([]);
    setIsBuilding(false);
    alert('Form saved successfully!');
  };

  const deleteForm = (id: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(form => form.id !== id));
    }
  };

  const editForm = (form: Form) => {
    setFormTitle(form.title);
    setFormDescription(form.description);
    setFields(form.fields);
    setIsBuilding(true);
    setForms(forms.filter(f => f.id !== form.id));
  };

  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700 }}>Form Builder</h1>
          {!isBuilding && (
            <button
              onClick={() => setIsBuilding(true)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              + Create New Form
            </button>
          )}
        </div>

        {isBuilding ? (
          <div style={{ backgroundColor: '#fff', padding: 32, borderRadius: 8, border: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Build Your Form</h2>
            
            {/* Form Details */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Form Title *</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter form title"
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 16,
                }}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Description</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Enter form description"
                rows={3}
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 16,
                }}
              />
            </div>

            {/* Field Types */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Add Fields</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {fieldTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => addField(type.value as FormField['type'])}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    + {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Preview */}
            {fields.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Form Preview</h3>
                <div style={{ backgroundColor: '#f9fafb', padding: 24, borderRadius: 8 }}>
                  {fields.map((field, index) => (
                    <div key={field.id} style={{ marginBottom: 24, position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                        <div style={{ flex: 1 }}>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            style={{
                              width: '100%',
                              padding: 8,
                              border: '1px solid #d1d5db',
                              borderRadius: 4,
                              fontWeight: 600,
                              marginBottom: 8,
                            }}
                          />
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                              />
                              Required
                            </label>
                            <span style={{ fontSize: 12, color: '#6b7280' }}>Type: {field.type}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
                          <button
                            onClick={() => moveField(index, 'up')}
                            disabled={index === 0}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: 4,
                              backgroundColor: 'white',
                              cursor: index === 0 ? 'not-allowed' : 'pointer',
                              opacity: index === 0 ? 0.5 : 1,
                            }}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveField(index, 'down')}
                            disabled={index === fields.length - 1}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #d1d5db',
                              borderRadius: 4,
                              backgroundColor: 'white',
                              cursor: index === fields.length - 1 ? 'not-allowed' : 'pointer',
                              opacity: index === fields.length - 1 ? 0.5 : 1,
                            }}
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeField(field.id)}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #ef4444',
                              borderRadius: 4,
                              backgroundColor: 'white',
                              color: '#ef4444',
                              cursor: 'pointer',
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Field Preview */}
                      {field.type === 'textarea' ? (
                        <textarea
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                          rows={3}
                          style={{
                            width: '100%',
                            padding: 12,
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                          }}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          style={{
                            width: '100%',
                            padding: 12,
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                          }}
                        >
                          <option>Select an option</option>
                          {field.options?.map((opt, i) => (
                            <option key={i}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <input type="checkbox" />
                          {field.label}
                        </label>
                      ) : field.type === 'radio' ? (
                        <div>
                          {field.options?.map((opt, i) => (
                            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <input type="radio" name={field.id} />
                              {opt}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                          style={{
                            width: '100%',
                            padding: 12,
                            border: '1px solid #d1d5db',
                            borderRadius: 6,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={saveForm}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Save Form
              </button>
              <button
                onClick={() => {
                  setIsBuilding(false);
                  setFormTitle('');
                  setFormDescription('');
                  setFields([]);
                }}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            {forms.length === 0 ? (
              <div style={{ backgroundColor: '#fff', padding: 48, borderRadius: 8, border: '1px solid #e0e0e0', textAlign: 'center' }}>
                <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 16 }}>No forms created yet</p>
                <p style={{ fontSize: 14, color: '#9ca3af' }}>Click "Create New Form" to get started</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {forms.map(form => (
                  <div key={form.id} style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, border: '1px solid #e0e0e0' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{form.title}</h3>
                    <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>{form.description}</p>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>
                      {form.fields.length} fields • Created {form.createdAt.toLocaleDateString()}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => editForm(form)}
                        style={{
                          flex: 1,
                          padding: '8px 16px',
                          border: '1px solid #3b82f6',
                          borderRadius: 6,
                          backgroundColor: 'white',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteForm(form.id)}
                        style={{
                          flex: 1,
                          padding: '8px 16px',
                          border: '1px solid #ef4444',
                          borderRadius: 6,
                          backgroundColor: 'white',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
