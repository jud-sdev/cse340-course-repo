import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { organizationValidation } from './controllers/organizations.js';
import { showEditOrganizationForm } from './controllers/organizations.js';
import { processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import { showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm } from './controllers/users.js';
import { showLoginForm, processLoginForm, processLogout } from './controllers/users.js';
import { requireLogin, showDashboard, requireRole } from './controllers/users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);

// Route for new project page (admin only)
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission (admin only)
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Route for edit project page (admin only)
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Route to handle edit project form submission (admin only)
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.get('/categories', showCategoriesPage);

// Route for new category page (admin only)
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

// Route to handle new category form submission (admin only)
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

// Route for edit category page (admin only)
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

// Route to handle edit category form submission (admin only)
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// Route for new organization page (admin only)
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission (admin only)
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route for edit organization page (admin only)
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle edit organization form submission (admin only)
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for service project details page
router.get('/project/:id', showProjectDetailsPage);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Routes to handle the assign categories to project form (admin only)
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login and logout routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected route — requires a logged-in user
router.get('/dashboard', requireLogin, showDashboard);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;
