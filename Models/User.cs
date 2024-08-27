// Models/User.cs
// Models/User.cs
// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string? Name { get; set; } 
        
        [Required]
        [EmailAddress]
        public string? Email { get; set; } 
    }
}
