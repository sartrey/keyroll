using Sartrey;
using System.Collections.Generic;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class Asset
    {
        private string _Id;
        private string _Name;
        private string _Type;
        private List<Tag> _Tags 
            = new List<Tag>();

        public string Id 
        {
            get { return _Id; }
        }

        public string Name 
        {
            get { return _Name; }
            set { _Name = value; }
        }

        public string Type 
        {
            get { return _Type; }
            set { _Type = value; }
        }

        public List<Tag> Tags 
        {
            get { return _Tags; }
        }

        public Asset() 
        {
            _Id = SLUC.Instance.Next();
        }

        public Asset(string id)
        {
            _Id = id;
        }

        public static Asset Parse(XElement xml)
        {
            var asset = new Asset();

            return null;
        }

        public void Import() { }

        public void Export() { }

        public XElement ToXML() 
        {
            return null;
        }
    }
}
