import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT project.project_id, project.title, project.description,
               project.location, project.date, organization.name AS organization_name
        FROM public.project
        JOIN public.organization ON project.organization_id = organization.organization_id
        ORDER BY project.date;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT project.project_id, project.title, project.description,
               project.date, project.location, project.organization_id,
               organization.name AS organization_name
        FROM public.project
        JOIN public.organization ON project.organization_id = organization.organization_id
        WHERE project.date >= CURRENT_DATE
        ORDER BY project.date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT project.project_id, project.title, project.description,
               project.date, project.location, project.organization_id,
               organization.name AS organization_name
        FROM public.project
        JOIN public.organization ON project.organization_id = organization.organization_id
        WHERE project.project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    // Return the first row of the result set, or null if no rows are found
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT project.project_id, project.title
        FROM public.project
        JOIN public.project_category ON project.project_id = project_category.project_id
        WHERE project_category.category_id = $1
        ORDER BY project.date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId };
