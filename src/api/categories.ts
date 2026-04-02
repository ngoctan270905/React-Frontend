export interface CategoryListItem {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  parent_id: string | null
  is_active: boolean
  level: number
  sort_order: number
  created_at: string
}

export interface CategoryListData {
  total_count: number
  page: number
  page_size: number
  items: CategoryListItem[] 
}

export interface CategoryListResponse {
  success: boolean      
  message: string
  data: CategoryListData
}

export interface CategoryData {
  name: string
  slug: string | null
  description: string | null
  image: File | null
  parent_id: string | null
  is_active: boolean
}

export interface CategoryResponse {
  success: boolean
  message: string
  data: CategoryListItem
}

export interface CategoryUpdatePayload {
  name?: string
  slug?: string
  description?: string
  image?: File | null
  parent_id?: string | null
  is_active?: boolean
}

export interface CategoryUpdateDetail {
  id: string
  name: string
  slug: string
  description: string
  image_url: string
  parent_id: string | null
  is_active: boolean
  level: number
  sort_order: number
  updated_at: string
}

export interface CategoryUpdateResponse {
  success: boolean
  message: string
  data: CategoryUpdateDetail
}

export default async function getCategoryList(page: number = 1, pageSize: number = 10): Promise<CategoryListResponse> {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/categories/?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category list");
    }

    return response.json();
  }

export async function createCategory(data: CategoryData): Promise<CategoryResponse> {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug || "");
  formData.append("parent_id", data.parent_id || "");
  formData.append("description", data.description || "");
  formData.append("is_active", String(data.is_active));

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await fetch("http://127.0.0.1:8000/api/v1/admin/categories/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}

export async function updateCategory(categoryId: string, payload: CategoryUpdatePayload): Promise<CategoryUpdateResponse> {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  if (payload.name) formData.append("name", payload.name);
  if (payload.slug) formData.append("slug", payload.slug);
  if (payload.description) formData.append("description", payload.description);
  if (payload.parent_id) formData.append("parent_id", payload.parent_id);
  if (payload.is_active !== undefined) formData.append("is_active", String(payload.is_active));
  if (payload.image instanceof File) {
    formData.append("image", payload.image);
  } else if (payload.image === null) {
    formData.append("image", ""); 
  }   
  const response = await fetch(`http://127.0.0.1:8000/api/v1/admin/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
}