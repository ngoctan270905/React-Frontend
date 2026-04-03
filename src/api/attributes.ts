export interface AttributeValue {
    value: string;
    colorCode?: string;
}

export interface AttributeItem {
    id: string;
    name: string;
    code: string;
    type: string;
    isVariantAttribute: boolean;
    isFilterable: boolean;
    values: AttributeValue[];
}

export interface AttributeData {
    attributes: AttributeItem[];
}

export interface AttributeResponse {
    success: boolean;
    message: string;
    data: AttributeData;
}

export interface AttributeCreateData {
    name: string;
    code: string;
    type: string;
    isVariantAttribute: boolean;
    isFilterable: boolean;
    values: AttributeValue[];
}

export interface AttributeCreateResponse {
    success: boolean;
    message: string;
    data: AttributeItem;
}

export interface AttributeUpdateData {
    name?: string;
    code?: string;
    type?: string;
    isVariantAttribute?: boolean;
    isFilterable?: boolean;
    values?: AttributeValue[];
}

export interface AttributeUpdateResponse {
    success: boolean;
    message: string;
    data: AttributeItem;
}







export async function GetAllAttributes(): Promise<AttributeResponse> {
    const token = localStorage.getItem("token");
    const response = await fetch('http://127.0.0.1:8000/api/v1/admin/attributes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch attributes');
    }

    return response.json();
}

export async function CreateAttribute(data: AttributeCreateData): Promise<AttributeCreateResponse> {
    const token = localStorage.getItem("token");
    const response = await fetch('http://127.0.0.1:8000/api/v1/admin/attributes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create attribute');
    }

    return response.json();
}

export async function UpdateAttribute(attributeId: string, data: AttributeUpdateData): Promise<AttributeUpdateResponse> {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/attributes/${attributeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update attribute');
    }

    return response.json();
}