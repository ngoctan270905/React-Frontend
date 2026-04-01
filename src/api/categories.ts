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