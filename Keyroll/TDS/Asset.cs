using Sartrey;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class Asset
    {
        private string _Id = null;
        private string _Name = null;
        private string _Type = null;
        private string _Hash = null;
        private List<Tag> _Tags 
            = new List<Tag>();
        private Storage _Storage;

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

        public string Hash 
        {
            get 
            {
                if (_Hash == null) 
                {
                    var stream = File.Open(_Storage.Path, FileMode.Open, FileAccess.Read);
                    var archive = new ZipArchive(stream, ZipArchiveMode.Read);
                    var entry = archive.GetEntry(_Id);
                    var entry_stream = entry.Open();
                    var hash = new Hash(entry_stream);
                    _Hash = hash.GetMD5Cng();
                    archive.Dispose();
                    stream.Close();
                }
                return _Hash; 
            }
        }

        public string ZipPath 
        {
            get { return "data\\" + _Id; }
        }

        public List<Tag> Tags 
        {
            get { return _Tags; }
        }

        public Storage Storage
        {
            get { return _Storage; }
            set { _Storage = value; }
        }

        public Asset() 
        {
        }

        public static Asset Parse(XElement xml)
        {
            var asset = new Asset();
            asset._Id = xml.Attribute("id").Value;
            asset._Name = xml.Element("name").Value;
            asset._Type = xml.Element("type").Value;
            asset._Hash = xml.Element("hash").Value;
            return asset;
        }

        public static Asset Create()
        {
            var asset = new Asset();
            asset._Id = Guid.NewGuid().ToString("N");
            return asset;
        }

        public static Asset FromFile(string path)
        {
            var asset = new Asset();
            asset._Id = Guid.NewGuid().ToString("N");
            asset._Name = Path.GetFileName(path);
            var stream = File.Open(path, FileMode.Open, FileAccess.Read);
            var hash = new Hash(stream);
            asset._Hash = hash.GetMD5Cng();
            stream.Close();
            return asset;
        }

        public XElement ToXML() 
        {
            var xml = new XElement("asset",
                new XAttribute("id", Id),
                new XElement("name", Name),
                new XElement("type", Type),
                new XElement("hash", Hash));
            return xml;
        }
    }
}
