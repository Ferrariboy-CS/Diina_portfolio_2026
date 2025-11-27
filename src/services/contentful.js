import { createClient } from 'contentful'
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../config/env'

// Initialize Contentful client only if credentials are provided
const client = CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN
  ? createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    })
  : null

// Fetch all blog posts
export const fetchBlogPosts = async () => {
  if (!client) {
    console.warn('Contentful client not configured. Using fallback blog posts.')
    return getFallbackPosts()
  }

  try {
    const response = await client.getEntries({
      content_type: 'blogPost', // Make sure this matches your Contentful content type ID
      order: '-sys.createdAt',
    })

    return response.items.map(item => ({
      id: item.sys.id,
      slug: item.fields.slug,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      coverImage: item.fields.coverImage?.fields?.file?.url 
        ? `https:${item.fields.coverImage.fields.file.url}`
        : null,
      tags: item.fields.tags || [],
      date: new Date(item.sys.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      createdAt: item.sys.createdAt,
    }))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return getFallbackPosts()
  }
}

// Fetch single blog post by slug
export const fetchBlogPostBySlug = async (slug) => {
  if (!client) {
    console.warn('Contentful client not configured. Using fallback blog post.')
    const posts = getFallbackPosts()
    return posts.find(post => post.slug === slug) || null
  }

  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    const item = response.items[0]
    return {
      id: item.sys.id,
      slug: item.fields.slug,
      title: item.fields.title,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      coverImage: item.fields.coverImage?.fields?.file?.url
        ? `https:${item.fields.coverImage.fields.file.url}`
        : null,
      tags: item.fields.tags || [],
      date: new Date(item.sys.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      createdAt: item.sys.createdAt,
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// Fallback posts when CMS is not configured
const getFallbackPosts = () => [
  {
    id: '1',
    slug: 'my-journey-in-marine-science',
    title: 'My Journey in Marine Science',
    excerpt: 'From growing up in Namibia to pursuing a career in fisheries and marine conservation, this is my story of discovering my passion for the ocean.',
    content: `
## How It All Began

Growing up in Namibia, I was always fascinated by the diverse ecosystems our country has to offer. From the Namib Desert to the Atlantic coastline, nature has always been my greatest teacher.

## Discovering Marine Science

When I enrolled at the University of Namibia's Sam Nujoma Marine and Coastal Resources Research Centre (SANUMARC), I knew I had found my calling. The program opened my eyes to the complexities of marine ecosystems and the importance of sustainable fisheries management.

## Field Experience

My internships at MFMR, Gobabeb Research Institute, and the Tsaobis Baboon Project gave me invaluable hands-on experience. Each opportunity taught me something new about research methodology, data collection, and the importance of conservation.

## Looking Forward

As I continue my journey in this field, I'm excited about the opportunities to contribute to marine conservation in Namibia and beyond. The ocean needs passionate advocates, and I'm committed to being one of them.
    `,
    coverImage: null,
    tags: ['Marine Science', 'Career', 'Namibia'],
    date: 'November 15, 2024',
    createdAt: '2024-11-15',
  },
  {
    id: '2',
    slug: 'importance-of-aquaculture',
    title: 'The Importance of Aquaculture in Namibia',
    excerpt: 'Exploring how sustainable aquaculture practices can contribute to food security and economic development in Namibia.',
    content: `
## What is Aquaculture?

Aquaculture, or fish farming, is the practice of cultivating aquatic organisms under controlled conditions. It's becoming increasingly important for global food security.

## Namibia's Aquaculture Potential

With our extensive coastline and freshwater resources, Namibia has significant potential for developing sustainable aquaculture operations. The training I received at Henties Bay opened my eyes to these possibilities.

## Sustainable Practices

It's crucial that aquaculture development follows sustainable practices. This includes:
- Proper water quality management
- Responsible feed sourcing
- Disease prevention protocols
- Environmental impact monitoring

## Future Opportunities

I believe aquaculture can play a vital role in Namibia's economic development while providing nutritious food for our growing population.
    `,
    coverImage: null,
    tags: ['Aquaculture', 'Sustainability', 'Food Security'],
    date: 'October 20, 2024',
    createdAt: '2024-10-20',
  },
  {
    id: '3',
    slug: 'conservation-efforts-namibian-coast',
    title: 'Conservation Efforts Along the Namibian Coast',
    excerpt: 'Highlighting the ongoing conservation initiatives and challenges facing our marine ecosystems.',
    content: `
## Our Marine Heritage

The Namibian coastline is home to incredible biodiversity, from the Cape fur seals at Cape Cross to the diverse fish populations that support our fishing industry.

## Current Conservation Challenges

Our marine ecosystems face several challenges:
- Climate change impacts on fish populations
- Marine pollution and plastic waste
- Overfishing pressures
- Habitat degradation

## Community Involvement

Beach cleanup campaigns and community education programs are essential for conservation success. During my time at UNAM, I participated in several coastal cleanup initiatives.

## The Role of Research

Scientific research is crucial for developing effective conservation strategies. Understanding fish population dynamics, migration patterns, and ecosystem health helps inform management decisions.

## How You Can Help

Everyone can contribute to marine conservation:
- Reduce plastic use
- Support sustainable seafood choices
- Participate in local cleanup events
- Spread awareness about marine issues
    `,
    coverImage: null,
    tags: ['Conservation', 'Marine Life', 'Environment'],
    date: 'September 8, 2024',
    createdAt: '2024-09-08',
  },
]
