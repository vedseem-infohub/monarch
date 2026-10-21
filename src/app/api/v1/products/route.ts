import { NextRequest, NextResponse } from 'next/server';
import { ALL_PRODUCTS } from '@/data/products';
import { NEW_ARRIVALS_PRODUCTS } from '@/data/newArrivals';
import { BEST_SELLERS_PRODUCTS } from '@/data/bestSellers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort')?.toLowerCase();
    const category = searchParams.get('category')?.toLowerCase();
    const gender = searchParams.get('gender')?.toLowerCase();
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    let result = [...ALL_PRODUCTS];

    if (sort === 'newest' || sort === 'new') {
      result = [...NEW_ARRIVALS_PRODUCTS];
    } else if (sort === 'bestsellers' || sort === 'popular') {
      result = [...BEST_SELLERS_PRODUCTS];
    }

    if (category) {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === category ||
          p.categoryName?.toLowerCase() === category
      );
    }

    if (gender) {
      result = result.filter((p) => p.gender.toLowerCase() === gender);
    }

    const paginated = result.slice(0, isNaN(limit) ? 8 : limit);

    return NextResponse.json(
      {
        success: true,
        count: paginated.length,
        total: result.length,
        sort: sort || 'default',
        data: paginated,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while resolving product catalog' },
      { status: 500 }
    );
  }
}
