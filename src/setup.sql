-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO project (organization_id, title, description, location, date)
VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Center Renovation', 'Renovate the aging downtown community center with sustainable materials.', 'Downtown District', '2026-08-05'),
(1, 'Wheelchair Ramp Build', 'Construct wheelchair ramps for homes of elderly residents.', 'Maple Neighborhood', '2026-08-12'),
(1, 'Public Park Pavilion', 'Build a covered pavilion for community gatherings at Riverside Park.', 'Riverside Park', '2026-08-20'),
(1, 'School Playground Repair', 'Repair and repaint the playground equipment at Lincoln Elementary.', 'Lincoln Elementary', '2026-09-02'),
(1, 'Affordable Housing Framing', 'Frame walls for two new affordable housing units.', 'Eastside Lots', '2026-09-15'),
-- GreenHarvest Growers (organization_id = 2)
(2, 'Community Garden Planting', 'Plant vegetables and herbs in the shared community garden.', 'Elm Street Garden', '2026-08-08'),
(2, 'Composting Workshop', 'Teach neighbors how to build and maintain a compost system.', 'GreenHarvest HQ', '2026-08-18'),
(2, 'Rooftop Garden Setup', 'Install planter boxes for a new rooftop garden.', 'Central Library Roof', '2026-08-26'),
(2, 'Farmers Market Booth', 'Run an educational booth on urban farming at the local market.', 'City Market Square', '2026-09-05'),
(2, 'Fruit Tree Orchard', 'Plant fruit trees along the neighborhood greenway.', 'Greenway Trail', '2026-09-19'),
-- UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Sorting', 'Sort and package donated food for local distribution.', 'UnityServe Warehouse', '2026-08-10'),
(3, 'Senior Home Visits', 'Coordinate friendly visits and activities for seniors.', 'Sunset Senior Home', '2026-08-22'),
(3, 'Neighborhood Cleanup', 'Collect litter and beautify public streets.', 'West End District', '2026-08-30'),
(3, 'Coat Drive Distribution', 'Distribute donated winter coats to families in need.', 'Community Shelter', '2026-09-10'),
(3, 'Tutoring Program Launch', 'Set up and staff an after-school tutoring program.', 'Downtown Library', '2026-09-22');
