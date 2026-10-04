-- ==============================================================================
-- KING MAKER OF INDIAN POLITICS - INITIAL SEED DATA
-- Default Game World, States, Constituencies, Parties, and Current Affairs
-- ==============================================================================

-- 1. Default Game World
INSERT INTO game_worlds (code, name, status, current_phase, day_count)
VALUES ('bharat-default-world', 'Republic of India - Official Simulation World', 'active', 'campaigning', 12)
ON CONFLICT (code) DO NOTHING;

-- 2. States & UTs
INSERT INTO states (code, name, capital, assembly_seats, lok_sabha_seats, population, dominant_issues)
VALUES
('UP', 'Uttar Pradesh', 'Lucknow', 403, 80, 240000000, ARRAY['Law & Order', 'Youth Employment', 'Expressways', 'Cattle & Farming']),
('MH', 'Maharashtra', 'Mumbai', 288, 48, 126000000, ARRAY['Industrial Investment', 'Agrarian Relief', 'Urban Infra', 'Metro Projects']),
('WB', 'West Bengal', 'Kolkata', 294, 42, 99000000, ARRAY['Welfare Schemes', 'MGNREGA Dues', 'Industry Revival', 'Education Access']),
('BR', 'Bihar', 'Patna', 243, 40, 130000000, ARRAY['Special State Status', 'Caste Survey Relief', 'Employment Guarantee', 'Flood Control']),
('TN', 'Tamil Nadu', 'Chennai', 234, 39, 77000000, ARRAY['Fiscal Autonomy', 'Language & Culture', 'Manufacturing & EV', 'NEET Exemption']),
('MP', 'Madhya Pradesh', 'Bhopal', 230, 29, 85000000, ARRAY['Ladli Behna Scheme', 'Irrigation & Farming', 'Tribal Welfare', 'Mining']),
('KA', 'Karnataka', 'Bengaluru', 224, 28, 68000000, ARRAY['Guarantee Schemes', 'Tech Infrastructure', 'Water Sharing', 'Urban Mobility']),
('GJ', 'Gujarat', 'Gandhinagar', 182, 26, 71000000, ARRAY['GIFT City & Finance', 'Port Development', 'Renewable Energy', 'Water Grid']),
('RJ', 'Rajasthan', 'Jaipur', 200, 25, 81000000, ARRAY['Solar Energy Expansion', 'ERCP Water Project', 'Paper Leak Prevention', 'Tourism']),
('AP', 'Andhra Pradesh', 'Amaravati', 175, 25, 53000000, ARRAY['Amaravati Capital Construction', 'Polavaram Dam', 'Industrial Parks', 'Youth Jobs']),
('OD', 'Odisha', 'Bhubaneswar', 147, 21, 46000000, ARRAY['Mining Royalties', 'Disaster Resilience', 'Heritage Corridors', 'Health Card']),
('KL', 'Kerala', 'Thiruvananthapuram', 140, 20, 35000000, ARRAY['Higher Education', 'Financial Deficit', 'SilverLine Project', 'Expatriate Welfare']),
('TS', 'Telangana', 'Hyderabad', 119, 17, 39000000, ARRAY['Rythu Bharosa', 'Pharma City & AI', 'Water Irrigation', 'Loan Waiver']),
('PB', 'Punjab', 'Chandigarh', 117, 13, 31000000, ARRAY['MSP Guarantee', 'Groundwater Depletion', 'Drug Eradication', 'Industrial Growth']),
('DL', 'NCT of Delhi', 'New Delhi', 70, 7, 21000000, ARRAY['Full Statehood', 'Air Quality Action', 'School Education', 'Subsidized Power']),
('JK', 'Jammu & Kashmir', 'Srinagar / Jammu', 90, 5, 14000000, ARRAY['Statehood Restoration', 'Tourism & Apple Orchards', 'Hydro Power', 'Youth Jobs'])
ON CONFLICT (code) DO NOTHING;

-- 3. High Profile Lok Sabha Constituencies
INSERT INTO constituencies (constituency_number, name, type, category, registered_voters, urban_rural_ratio)
VALUES
(1, 'Varanasi', 'lok_sabha', 'GEN', 1850000, 0.65),
(2, 'Gandhinagar', 'lok_sabha', 'GEN', 1940000, 0.78),
(3, 'Wayanad', 'lok_sabha', 'GEN', 1420000, 0.22),
(4, 'Baramati', 'lok_sabha', 'GEN', 2100000, 0.40),
(5, 'New Delhi', 'lok_sabha', 'GEN', 1520000, 0.98),
(6, 'Bengaluru South', 'lok_sabha', 'GEN', 2200000, 0.95),
(7, 'Hyderabad', 'lok_sabha', 'GEN', 1980000, 0.99),
(8, 'Amethi', 'lok_sabha', 'GEN', 1700000, 0.25),
(9, 'Diamond Harbour', 'lok_sabha', 'GEN', 1820000, 0.35),
(10, 'Chennai Central', 'lok_sabha', 'GEN', 1350000, 1.00)
ON CONFLICT DO NOTHING;

-- 4. Initial Political Parties
INSERT INTO parties (name, abbreviation, symbol_name, primary_color, secondary_color, ideology, manifesto_summary, treasury_balance, member_count, is_national_party)
VALUES
('Bharatiya Janata Party', 'BJP', 'Lotus', '#FF9933', '#138808', 'Nationalist', 'Nation first, Viksit Bharat 2047, infrastructure modernisation, direct benefit transfers, and strong national security.', 95000000, 18000, true),
('Indian National Congress', 'INC', 'Hand', '#1976D2', '#388E3C', 'Social Democratic', 'Nyay guarantees, youth apprentice schemes, caste census, MSP legal guarantee, and strengthening democratic institutions.', 72000000, 14500, true),
('Aam Aadmi Party', 'AAP', 'Broom', '#0072BB', '#F4B400', 'Centrist', 'Quality free education and healthcare mohalla clinics, clean governance, affordable utility services, and decentralised democracy.', 35000000, 6800, true),
('Trinamool Congress', 'TMC', 'Flowers & Grass', '#2E7D32', '#81C784', 'Regional Interest', 'Empowering state federalism, women safety cash-transfers, Bengal heritage, and welfare assistance at grassroots.', 42000000, 7200, false),
('Dravida Munnetra Kazhagam', 'DMK', 'Rising Sun', '#D32F2F', '#000000', 'Progressive', 'Dravidian model of social justice, state autonomy against central overreach, industrialisation, and secularism.', 48000000, 8100, false),
('Samajwadi Party', 'SP', 'Bicycle', '#E53935', '#43A047', 'Social Democratic', 'PDA unity (Pichhda, Dalit, Alpsankhyak), social equality, youth government recruitment, and farm loan relief.', 39000000, 6500, false)
ON CONFLICT (abbreviation) DO NOTHING;

-- 5. Verified News & Current Affairs Events
INSERT INTO news_events (title, summary, category, source_name, source_url, verification_status, in_game_impact)
VALUES
('Election Commission of India Announces Multi-Phase General Election Schedule', 'The Chief Election Commissioner outlined polling schedules across 543 Parliamentary constituencies with model code of conduct immediately enforced.', 'National', 'Press Information Bureau', 'https://eci.gov.in', 'verified', 'Election campaigns officially unlocked across all constituencies.'),
('National GDP Growth Projected at 7.2% for Current Fiscal Year', 'Strong performance in manufacturing, capital expenditure and rural consumption boost India economic trajectory amidst global headwinds.', 'Economy', 'Reserve Bank of India', 'https://rbi.org.in', 'verified', 'Treasury revenue collections increased by 6.4%.'),
('Parliament Passes Digital Public Infrastructure & AI Governance Framework Bill', 'The landmark legislation establishes ethical AI guidelines, citizen privacy protections, and opens ₹10,000 Cr compute access for startups.', 'National', 'Sansad TV', 'https://sansad.in', 'verified', 'Technology sector approval rating +8% in urban seats.'),
('Monsoon Arrival Sets Favourable Kharif Sowing Record Across Deccan & Plains', 'Adequate rainfall in central and northern belts ensures robust reservoir storage and bumper crop sowing estimates.', 'Public Welfare', 'India Meteorological Dept', 'https://mausam.imd.gov.in', 'verified', 'Agrarian satisfaction index +5.2%.')
ON CONFLICT DO NOTHING;
